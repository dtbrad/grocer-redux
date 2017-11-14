import React from 'react';
import ReactHighcharts from 'react-highcharts';
import moment from 'moment';
import PropTypes from 'prop-types';
import DeepEqual from 'deep-equal';

class SpendingChart extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !DeepEqual(this.props, nextProps);
  }

  prepRangeforLoad(timestamp) {
    const { unit } = this.props;
    const newUnit = unit === 'month' ? 'week' : 'day';
    const oldest_date = moment(timestamp);
    const newest_date = moment(oldest_date).add(1, unit);
    if (unit !== 'day') { this.props.loadChartAndTable({ oldest_date, newest_date, unit: newUnit }); }
  }

  render() {
    if (!this.props.chartData) {
      return (
        <div>Loading...</div>
      );
    }

    const formattedData = this.props.chartData.map(x => (
      [Date.parse(x[0]), x[1]]
    ));
    const componentScope = this;
    const spendingTitle = `spending by ${this.props.unit}`;
    const properDateFormat = this.props.unit === 'month' ? '%B %Y' : '%B %d, %Y';
    const properDateIntro = (this.props.unit === 'month' || this.props.unit === 'day') ? '' : 'Week of';

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
            `${properDateIntro} ${ReactHighcharts.Highcharts.dateFormat(properDateFormat, this.point.x)} - ${this.point.y}`
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

SpendingChart.propTypes = {
  unit: PropTypes.string.isRequired,
  chartData: PropTypes.arrayOf(PropTypes.shape).isRequired,
  loadChartAndTable: PropTypes.func.isRequired,
};

export default SpendingChart;
