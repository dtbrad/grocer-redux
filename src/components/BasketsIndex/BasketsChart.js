import React from 'react';
import ReactHighcharts from 'react-highcharts';

const BasketsChart = (props) => {

  if (!props.chartData) {
    return (
      <div>Loading...</div>
    );
  }

  const formattedData = props.chartData.map(x => (
    [Date.parse(x[0]), x[1] / 100]
  ));
  const spendingTitle = `spending by ${props.unit}`;
  const properDateFormat = props.unit === 'month' ? '%B %Y' : '%B %d, %Y';
  const properDateIntro = (props.unit === 'month' || props.unit === 'day') ? '' : 'Week of';

  const config = {
    chart: { type: 'spline' },
    title: {
      text: 'Spending History',
    },
    yAxis: {
      title: {
        text: 'Amount Spent ($)',
      },
    },
    xAxis: { type: 'datetime' },
    series: [{
      name: spendingTitle,
      data: formattedData,
    },
    ],
    tooltip: {
      formatter() {
        return (
          `${properDateIntro} ${ReactHighcharts.Highcharts.dateFormat(properDateFormat, this.point.x)} - $${this.point.y}`
        );
      },
    },
    credits: { enabled: false },
  };

  return (
    <div>
      <ReactHighcharts config={config} isPureConfig />
    </div>
  );
}


export default BasketsChart;
