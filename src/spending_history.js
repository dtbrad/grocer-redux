import React from 'react';
import ReactHighcharts from 'react-highcharts';
import moment from 'moment';

const deepEqual = require('deep-equal');

class SpendingHistory extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (!deepEqual(this.props, nextProps)) { return true } else { return false }
  }

  prepRangeforLoad(timestamp) {
    const unit = this.props.unit
    const newUnit = unit === 'month' ? 'week' : 'day';
    const oldest_date = moment(timestamp)
    const newest_date = moment(oldest_date).add(1, unit);
    if (unit !== 'day') { this.props.loadChartAndTable({oldest_date, newest_date, unit: newUnit}) }
  };

  render() {

    if (!this.props.chartData) {
      return (
        <div>Loading...</div>
      )
    };

    const formattedData = this.props.chartData.map(function(x){
      return [Date.parse(x[0]), x[1]/100]
    });
    const componentScope = this
    const spendingTitle = `spending by ${this.props.unit}`;
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
                 name: spendingTitle,
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
                      if(event.point.y > 0) {
                        componentScope.prepRangeforLoad(event.point.x)
                      }
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
