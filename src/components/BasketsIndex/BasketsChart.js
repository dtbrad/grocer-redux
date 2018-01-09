import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import moment from 'moment';
import DeepEqual from 'deep-equal';

class BasketsChart extends Component {
  shouldComponentUpdate(nextProps) {
    return !DeepEqual(this.props, nextProps);
  }

  prepRangeforLoad(timestamp) {
    const { unit } = this.props;
    const newUnit = unit === 'month' ? 'week' : 'day';
    const oldestDate = moment(timestamp);
    const newestDate = moment(oldestDate).add(1, unit);
    if (unit !== 'day') { this.props.loadSpendingTableAndChart({ resourceName: 'baskets', desc: true, sortCategory: 'sort_date', oldestDate, newestDate, unit: newUnit }) }
  }


  render() {
    const { chartData, unit } = this.props;
    if (!chartData) {
      return (
        <div>Loading...</div>
      );
    }

    const formattedData = chartData.map(x => (
      [Date.parse(x[0]), x[1] / 100]
    ));
    const componentScope = this;
    const spendingTitle = `spending by ${unit}`;
    const properDateFormat = unit === 'month' ? '%B %Y' : '%B %d, %Y';
    const properDateIntro = (unit === 'month' || unit === 'day') ? '' : 'Week of';

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


export default BasketsChart;
