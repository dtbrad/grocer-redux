import React from 'react';
import ReactHighcharts from 'react-highcharts';

class SpendingHistory extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.chartData !== nextProps.chartData || this.props.unit !== nextProps.unit ) {
      return true
    }
    else { return false}

  }

  render() {

    const formattedData = this.props.chartData.map(function(x){
      return [Date.parse(x[0]), x[1]/100]
    });

    const properDateFormat = this.props.unit === "month" ? "%B %Y" : "%B %d, %Y"
    const properDateIntro = (this.props.unit === "month" || this.props.unit === "day") ? "" : "Week of"

    const config = {
      chart: { type: 'spline' },
      title: {
            text: 'Spending History'
      },
      yAxis: {
        title: {
          text: 'Amount Spent ($)'
        }
      },
      xAxis: { type: 'datetime' },
      series: [{
                 name: 'Spending',
                 data: formattedData
               }
      ],
      tooltip: {
        formatter: function(){
          return (
            properDateIntro + " " + ReactHighcharts.Highcharts.dateFormat(properDateFormat , this.point.x) + " - $" + this.point.y
          );
        }
      },
      plotOptions: {
        series: {
          events: {
                    click:  function (event) {
                      // insert navigate-to-selected-time-period logic here later
                    },
                    legendItemClick: function () {
                      return false;
                    }
                  }
        }
      },
      credits: { enabled: false }
    }

    return (
      <div>
        <ReactHighcharts config = {config} isPureConfig={true}/>
      </div>
    )
  };
};

export default SpendingHistory;
