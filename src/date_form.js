import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class DateForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: null,
      endDate: null,
      dateOrderError: "hidden",
      datePresenceError: "hidden"
    };
    this.setStart = this.setStart.bind(this);
    this.setEnd = this.setEnd.bind(this);
  }

  setStart(date) {
    if(this.validateDateOrder({ start: date })) {
      this.setState({ startDate: date, dateOrderError: "hidden", datePresenceError: "hidden" });
    }
    else {
      this.setState({ datePresenceError: "hidden", dateOrderError: "" });
    }
  };

  setEnd(date) {
    if (this.validateDateOrder({end: date})) {
      this.setState({ endDate: date, dateOrderError: "hidden", datePresenceError: "hidden" });
    }
    else {
      this.setState({ datePresenceError: "hidden", dateOrderError: "" });
    }

  };

  validateDateOrder(date) {
    var stateBeginning = this.state.startDate ? this.state.startDate._d : null
    var stateFinish = this.state.endDate ? this.state.endDate._d : null
    var newBeginning = date["start"] ? date["start"]._d : null
    var newFinish = date["end"] ? date["end"]._d : null
    if ((stateFinish === null || newBeginning < stateFinish) && (newFinish === null || newFinish > stateBeginning)) {
      return true
    }
  };

  submitIfDatesPresent(){
    if (this.state.startDate && this.state.endDate) {
      this.setState({ datePresenceError: "hidden" });
      this.props.changeDate(this.state.startDate, this.state.endDate)
    }
    else {
      this.setState({datePresenceError: "", dateOrderError: "hidden"});
    }
  };

  render() {
    return (
      <div>
        <h5 className={this.state.dateOrderError} style={{ paddingLeft: '15px', color: 'red'}}>End date cannot be before start date!</h5>
        <h5 className={this.state.datePresenceError} style={{ paddingLeft: '15px', color: 'red'}}>Please enter a start and end date!</h5>
        <div>
          <div className="col-xs-3" style={{ paddingRight: '15px' }}>
            <DatePicker
              maxDate={moment().subtract(1, "days")}
              placeholderText="start date"
              selected={this.state.startDate}
              onChange={this.setStart}
              className="datepicker form-control"
            />
          </div>
          <div className="col-xs-3"  style={{ paddingLeft: '15px' }}>
            <DatePicker
              minDate={moment()}
              placeholderText="end date"
              selected={this.state.endDate}
              onChange={this.setEnd}
              className="datepicker form-control"
            />
          </div>
          <div className="col-xs-3"  style={{ paddingRight: '10px' }}>
            <input className="form-control" placeholder="to be used soon!"/>
          </div>
          <div className="col-xs-3 text-right" style={{ paddingRight: '2%' }}>
            <button className="btn btn-warning btn-block" onClick={ () => this.submitIfDatesPresent() }>Update</button>
            <br/>
          </div>
        </div>
      </div>
    );
  };
};

export default DateForm
