import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class DateForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      startDate: moment(props.start_date),
      endDate: moment(props.end_date),
      unit: props.unit,
      missingDates: false,
      outOfOrder: false,
      tooShortforMonth: false,
      tooShortforWeek: false };
    this.setStart = this.setStart.bind(this);
    this.setEnd = this.setEnd.bind(this);
  }

  correctUnitforRange(){
    var s = this.state.startDate
    var e = this.state.endDate
    var diff = e.diff(s, 'days');
    if ((diff < 15) && (this.state.unit !== "day")) {
      this.setState({ tooShortforWeek: true, tooShortforMonth: false })
    }
    else if (diff < 30 && this.state.unit === "month") {
      this.setState({ tooShortforMonth: true, tooShortforWeek: false })
    }
    else {
      this.setState({ tooShortforMonth: false, tooShortforWeek: false })
    }
  };


  checkErrors() {
    var stateBeginning = this.state.startDate ? this.state.startDate._d : null
    var stateFinish = this.state.endDate ? this.state.endDate._d : null
    if (stateBeginning === null || stateFinish === null) {
      this.setState({ missingDates: true, outOfOrder: false });
    }
    else if (stateBeginning >= stateFinish ) {
      this.setState({ outOfOrder: true, missingDates: false });
    }
    else {
      this.setState({missingDates: false, outOfOrder: false}, this.correctUnitforRange)
    }
  }

  setStart(date) {
    this.setState({ startDate: date }, this.checkErrors);
  };

  setEnd(date) {
    this.setState({ endDate: date }, this.checkErrors);
  };

  handleSelect(){
    var newUnit = this.refs.unitSelector.value
    this.setState({unit: newUnit}, this.checkErrors);
  };

  submitIfDatesPresent(){
    if (this.state.missingDates === true || this.state.outOfOrder === true || this.state.tooShortforMonth === true || this.state.tooShortforWeek === true) {
      alert("Fix your date range before submitting")
    }
    else {
      this.props.changeDate(this.state.startDate, this.state.endDate, this.state.unit)
    }
  };

  render() {
      return (
        <div className="content row">
          <h5 className={this.state.outOfOrder === true ? '' : 'hidden'} style={{ paddingLeft: '15px', color: 'red'}}>End date cannot be before start date!</h5>
          <h5 className={this.state.missingDates === true ? '' : 'hidden'} style={{ paddingLeft: '15px', color: 'red'}}>Please enter both a start and end date!</h5>
          <h5 className={this.state.tooShortforMonth === true ? '' : 'hidden'} style={{ paddingLeft: '15px', color: 'red'}}>Ranges under a month need to be in weeks or days</h5>
          <h5 className={this.state.tooShortforWeek === true ? '' : 'hidden'} style={{ paddingLeft: '15px', color: 'red'}}>Ranges this short must be in days</h5>
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
                placeholderText="end date"
                selected={this.state.endDate}
                onChange={this.setEnd}
                className="datepicker form-control"
              />
            </div>
            <div className="col-xs-3"  style={{ paddingRight: '10px' }}>
              <select ref = "unitSelector" className="form-control" onChange={(e) => {this.handleSelect()} } value={this.state.unit}>
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              </select>
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
