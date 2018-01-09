import React from 'react';
import ReactHighcharts from 'react-highcharts';

const ProductChart = (props) => {
  if (!props.chartData) {
    return (
      <div>Loading...</div>
    );
  }

  const formattedData = props.chartData.map(x => (
    [Date.parse(x[0]), x[1]]
  ));
  const spendingTitle = `spending by ${props.unit}`;
  const properDateFormat = props.unit === 'month' ? '%B %Y' : '%B %d, %Y';
  const properDateIntro = (props.unit === 'month' || props.unit === 'day') ? '' : 'Week of';

  const config = {
    chart: { type: 'spline' },
    title: {
      text: `Purchasing History For ${props.productName}`,
    },
    yAxis: {
      title: {
        text: 'Qty',
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
          `${properDateIntro} ${ReactHighcharts.Highcharts.dateFormat(properDateFormat, this.point.x)} - purchased ${this.point.y} ${this.point.y > 1 ? 'times' : 'time'}`
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
};

export default ProductChart;
