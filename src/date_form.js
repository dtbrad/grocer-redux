import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class DateForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      oldest_date: moment(props.oldest_date),
      newest_date: moment(props.newest_date),
      unit: props.unit,
      missingDates: false,
      outOfOrder: false,
      tooShortforMonth: false,
      tooShortforWeek: false };
    this.setOldest = this.setOldest.bind(this);
    this.setNewest = this.setNewest.bind(this);
  }

  correctUnitforRange(){
    var s = this.state.oldest_date
    var e = this.state.newest_date
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
    var stateBeginning = this.state.oldest_date ? this.state.oldest_date._d : null
    var stateFinish = this.state.newest_date ? this.state.newest_date._d : null
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

  setOldest(date) {
    this.setState({ oldest_date: date }, function(){ this.checkErrors()});
  };

  setNewest(date) {
    this.setState({ newest_date: date }, function(){ this.checkErrors()});
  };

  handleSelect(){
    var newUnit = this.refs.unitSelector.value
    this.setState({unit: newUnit}, this.checkErrors);
  };

  submitIfDatesPresent(){
    const deepEqual = require('deep-equal');
    let oldest_date = null;
    let newest_date = null;

    if(this.state.missingDates === true || this.state.outOfOrder === true || this.state.tooShortforMonth === true || this.state.tooShortforWeek === true) {
      alert("Fix your date range before submitting")
    }
    else {
      if(deepEqual(this.state.oldest_date, this.props.oldest_date) && deepEqual(this.state.newest_date, this.props.newest_date)) {
        [oldest_date, newest_date] =[null, null]
      }
      else {
        [oldest_date, newest_date] =[this.state.oldest_date, this.state.newest_date]
      };
      this.props.changeDate({newest_date: newest_date, oldest_date: oldest_date, unit: this.state.unit})
    };
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
                placeholderText="start date"
                selected={this.state.oldest_date}
                onChange={this.setOldest}
                className="datepicker form-control"
              />
            </div>
            <div className="col-xs-3"  style={{ paddingLeft: '15px' }}>
              <DatePicker
                maxDate={moment().subtract(1, "days")}
                placeholderText="end date"
                selected={this.state.newest_date}
                onChange={this.setNewest}
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
