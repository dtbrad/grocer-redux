import React from 'react';
import Moment from 'react-moment';
const ReactHighcharts = require('react-highcharts');

const SpendingHistory = ({chartData}) => {

  const formattedData= chartData.map(function(x){
    return [Date.parse(x[0]), x[1]/100]
  });

  const config = {
    chart: { type: 'spline' },
    title: {
					text: 'Spending History'
		},
		yAxis: {
			title: {
				text: 'Amount Spent'
			},
			labels: { format: '${value}' }
		},
    xAxis: { type: 'datetime' },
		series: [{
	             name: 'spending',
					     data: formattedData
			       }
    ],
    tooltip: {
      pointFormat: '${point.y}'
    },
	  plotOptions: {
		  series: {
				events: {
                  click:  function (event) {
                    // insert navigate-to-selected-time-period here later
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
