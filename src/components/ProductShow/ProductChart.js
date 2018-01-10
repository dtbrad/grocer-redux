import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import moment from 'moment';
import DeepEqual from 'deep-equal';

class ProductChart extends Component {
  shouldComponentUpdate(nextProps) {
    return !DeepEqual(this.props, nextProps);
  }

  prepRangeforLoad(timestamp) {
    const { unit, productId, userId } = this.props;
    const newUnit = unit === 'month' ? 'week' : 'day';
    const oldestDate = moment(timestamp);
    const newestDate = moment(oldestDate).add(1, unit);
    if (unit !== 'day') { this.props.loadSpendingTableAndChart({ productId, userId, resourceName: 'product', desc: true, sortCategory: 'sort_date', oldestDate, newestDate, unit: newUnit }); }
  }

  render() {
    const { chartData, productName, unit } = this.props;
    if (!chartData) {
      return (
        <div>Loading...</div>
      );
    }

    const formattedData = chartData.map(x => (
      [Date.parse(x[0]), x[1]]
    ));
    const componentScope = this;
    const spendingTitle = `spending by ${unit}`;
    const properDateFormat = unit === 'month' ? '%B %Y' : '%B %d, %Y';
    const properDateIntro = (unit === 'month' || unit === 'day') ? '' : 'Week of';

    const config = {
      chart: { type: 'spline' },
      title: {
        text: `Purchasing History For ${productName}`,
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
      plotOptions: {
        series: {
          events: {
            click(event) {
              if (event.point.y > 0) {
                componentScope.prepRangeforLoad(event.point.x);
              }
            },
            legendItemClick() {
              return false;
            },
          },
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
}

export default ProductChart;
