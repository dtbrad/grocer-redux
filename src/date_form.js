import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class DateForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: null,
      endDate: null
    };
    this.setStart = this.setStart.bind(this);
    this.setEnd = this.setEnd.bind(this);
  }

  setStart(date) {
    this.setState({
      startDate: date
    });
  }

  setEnd(date) {
    this.setState({
      endDate: date
    });
  }

  render() {
    return (

    <div>
      <div className="col-xs-3" style={{ paddingRight: '15px'}}>
        <DatePicker
          placeholderText="start date"
          selected={this.state.startDate}
          onChange={this.setStart}
          className="datepicker form-control"
        />
      </div>
      <div className="col-xs-3"  style={{paddingLeft: '15px'}}>
        <DatePicker
          placeholderText="end date"
          selected={this.state.endDate}
          onChange={this.setEnd}
          className="datepicker form-control"
        />
      </div>
      <div className="col-xs-3"  style={{paddingRight: '10px'}}>
        <input className="form-control" placeholder="to be used soon!"/>
      </div>
      <div className="col-xs-3 text-right" style={{paddingRight: '2%'}}>
        <button className="btn btn-warning btn-block" onClick={() => this.props.changeDate(this.state.startDate, this.state.endDate)}>Update</button>
        <br/>
      </div>
    </div>

  );
  }
}

export default DateForm
