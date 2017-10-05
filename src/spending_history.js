import React from 'react';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';

const SpendingHistory = ({ chartData, unit }) => {

  const formattedData= chartData.map(function(x){
    return [Date.parse(x[0]), x[1]/100]
  });

  const properDateFormat = unit === "month" ? "%B %Y" : "%B %d, %Y"
  const properDateIntro = (unit === "month" || unit === "day") ? "" : "Week of"

  const config = {
    chart: { type: 'spline' },
    title: {
					text: 'Spending History'
		},
		yAxis: {
			title: {
				text: 'Amount Spent ($)'
			},
			labels: { format: '{value}' }
		},
    xAxis: { type: 'datetime' },
		series: [{
	             name: 'spending',
					     data: formattedData
			       }
    ],
    tooltip: {
      formatter: function(){
        return (
          properDateIntro + " " + Highcharts.dateFormat(properDateFormat , this.point.x) + " - $" + this.point.y
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
    <ReactHighcharts config = {config} />
  )
};

export default SpendingHistory;
