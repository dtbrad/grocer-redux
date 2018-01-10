import React from 'react';
import ReactHighcharts from 'react-highcharts';

const ProductsChart = ({ chartData }) => {
  const categories = chartData.map(cat => cat[0]);
  const amounts = chartData.map(am => am[1] / 100);

  const config = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Top Ten Products by Money Spent',
    },

    xAxis: {
      categories,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Quantity ($)',
      },
    },
    tooltip: {
      pointFormat: '${point.y:.2f}',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    series: [{
      name: 'Total Spent',
      data: amounts,

    }],
    credits: { enabled: false },
  };

  return (
    <div>
      <ReactHighcharts config={config} neverReflow isPureConfig />
    </div>
  );
};

export default ProductsChart;
