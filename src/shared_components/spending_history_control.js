import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import DeepEqual from 'deep-equal';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';

class SpendingHistoryControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldest_date: moment(props.oldest_date),
      newest_date: moment(props.newest_date),
      unit: props.unit,
      missingDates: false,
      outOfOrder: false,
      tooShortforMonth: false,
      tooShortforWeek: false,
    };
    this.setOldest = this.setOldest.bind(this);
    this.setNewest = this.setNewest.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      oldest_date: moment(nextProps.oldest_date),
      newest_date: moment(nextProps.newest_date),
      unit: nextProps.unit,
    });
  }

  async setNewest(date) {
    await this.setState({ newest_date: date });
    this.checkErrors();
  }

  async setOldest(date) {
    await this.setState({ oldest_date: date });
    this.checkErrors();
  }

  correctUnitforRange() {
    const { oldest_date, newest_date, unit } = this.state;
    const diff = newest_date.diff(oldest_date, 'days');
    if ((diff < 15) && (unit !== 'day')) {
      this.setState({ tooShortforWeek: true, tooShortforMonth: false });
    } else if (diff < 30 && this.state.unit === 'month') {
      this.setState({ tooShortforMonth: true, tooShortforWeek: false });
    } else {
      this.setState({ tooShortforMonth: false, tooShortforWeek: false });
    }
  }

  async checkErrors() {
    const stateBeginning = this.state.oldest_date ? this.state.oldest_date._d : null;
    const stateFinish = this.state.newest_date ? this.state.newest_date._d : null;
    if (stateBeginning === null || stateFinish === null) {
      this.setState({ missingDates: true, outOfOrder: false });
    } else if (stateBeginning >= stateFinish) {
      this.setState({ outOfOrder: true, missingDates: false });
    } else {
      await this.setState({ missingDates: false, outOfOrder: false });
      this.correctUnitforRange();
    }
  }

  async handleSelect() {
    const newUnit = this.unit_selector.value;
    await this.setState({ unit: newUnit });
    this.checkErrors();
  }

  submitIfDatesPresent() {
    let oldestDate = null;
    let newestDate = null;
    if (this.state.missingDates === true || this.state.outOfOrder === true ||
      this.state.tooShortforMonth === true || this.state.tooShortforWeek === true) {
      alert('Fix your date range before submitting')
    } else if (DeepEqual(this.state.oldest_date, this.props.oldest_date) && DeepEqual(this.state.newest_date, this.props.newest_date)) {
      [oldestDate, newestDate] = [null, null];
      this.props.loadChart({ unit: this.state.unit });
    } else {
      [oldestDate, newestDate] = [this.state.oldest_date, this.state.newest_date];
      this.props.loadChartAndTable({ newest_date: newestDate, oldest_date: oldestDate, unit: this.state.unit });
    }
  }

  render() {
    return (
      <div className="content row">
        <h5 className={this.state.outOfOrder === true ? '' : 'hidden'} style={{ paddingLeft: '15px', color: 'red' }}>
          End date cannot be before start date!
        </h5>
        <h5 className={this.state.missingDates === true ? '' : 'hidden'} style={{ paddingLeft: '15px', color: 'red' }}>
          Please enter both a start and end date!
        </h5>
        <h5 className={this.state.tooShortforMonth === true ? '' : 'hidden'} style={{ paddingLeft: '15px', color: 'red' }}>
          Ranges under a month need to be in weeks or days
        </h5>
        <h5 className={this.state.tooShortforWeek === true ? '' : 'hidden'} style={{ paddingLeft: '15px', color: 'red' }}>
          Ranges this short must be in days
        </h5>
        <div>
          <div className="col-xs-3" style={{ paddingRight: '15px' }}>
            <DatePicker
              placeholderText="start date"
              selected={this.state.oldest_date}
              onChange={props.setOldest}
              className="datepicker form-control"
              showYearDropdown
            />
          </div>
          <div className="col-xs-3" style={{ paddingLeft: '15px' }}>
            <DatePicker
              maxDate={moment().subtract(1, 'days')}
              placeholderText="end date"
              selected={this.state.newest_date}
              onChange={this.setNewest}
              className="datepicker form-control"
              showYearDropdown
            />
          </div>
          <div className="col-xs-3" style={{ paddingRight: '10px' }}>
            <select
              ref={(select) => { this.unit_selector = select; }}
              className="form-control"
              onChange={() => { this.handleSelect(); }}
              value={this.state.unit}
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
          </div>
          <div className="col-xs-3 text-right" style={{ paddingRight: '2%' }}>
            <button className="btn btn-warning btn-block" onClick={() => this.submitIfDatesPresent()}>Update</button>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

SpendingHistoryControl.propTypes = {
  oldest_date: PropTypes.instanceOf(moment).isRequired,
  newest_date: PropTypes.instanceOf(moment).isRequired,
  unit: PropTypes.string,
  loadChart: PropTypes.func.isRequired,
  loadChartAndTable: PropTypes.func.isRequired,
};

SpendingHistoryControl.defaultProps = {
  unit: 'month',
};

export default SpendingHistoryControl;
