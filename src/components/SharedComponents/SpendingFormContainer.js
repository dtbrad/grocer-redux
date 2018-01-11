import React, { Component } from 'react';
import moment from 'moment';
import DeepEqual from 'deep-equal';
import SpendingFormView from './SpendingFormView';

class SpendingFormContainer extends Component {
  state = {
    oldestDate: moment(this.props.oldestDate, "YYYY-MM-DD HH:mm"),
    newestDate: moment(this.props.newestDate, "YYYY-MM-DD HH:mm"),
    unit: this.props.unit || 'month',
    outOfOrder: null,
    wrongUnit: null,
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      oldestDate: moment(nextProps.oldestDate, "YYYY-MM-DD HH:mm"),
      newestDate: moment(nextProps.newestDate, "YYYY-MM-DD HH:mm"),
      unit: nextProps.unit || 'month',
    });
  }

  setOldest = async (date) => {
    await this.setState({ oldestDate: date });
    this.checkErrors();
  }

  setNewest = async (date) => {
    await this.setState({ newestDate: date });
    this.checkErrors();
  }

   setUnit = async (dan) => {
     await this.setState({ unit: dan.target.value });
     this.checkErrors();
   }

   checkErrors = () => {
     if (this.state.oldestDate >= this.state.newestDate) {
       this.setState({
         outOfOrder: true,
         wrongUnit: false,
         errorMessage: 'End date cannot be before start date!',
       });
     } else {
       this.setState({ outOfOrder: false, errorMessage: null, wrongUnit: false });
       this.correctUnitforRange();
     }
   }

   correctUnitforRange = async () => {
     const diff = this.state.newestDate.diff(this.state.oldestDate, 'days');
     if ((diff < 15) && (this.state.unit !== 'day')) {
       await this.setState({
         wrongUnit: true,
         errorMessage: 'Ranges this short must be in days',
       });
     } else if (diff < 30 && this.state.unit === 'month') {
       await this.setState({
         wrongUnit: true,
         errorMessage: 'Ranges under a month need to be in weeks or days',
       });
     } else {
       await this.setState({ tooShortForMonth: false, tooShortForWeek: false });
     }
   }

   loadAppropriateData = (args) => {
     const sameDates = (DeepEqual(this.state.oldestDate, moment(this.props.oldestDate)) &&
       DeepEqual(this.state.newestDate, moment(this.props.newestDate)));
     if (sameDates && this.state.unit === this.props.unit) {
       return
     } else if (sameDates) {
       this.props.loadChart(args);
     }
     this.props.loadSpendingTableAndChart(args);
   }

  submitForm = (f) => {
    f.preventDefault();
    if (!this.state.outOfOrder && !this.state.wrongUnit) {
      const args = { oldestDate: this.state.oldestDate._d, newestDate: this.state.newestDate._d, unit: this.state.unit, resourceName: this.props.resourceName, desc: true, page: 1, productId: this.props.productId, userId: this.props.userId }
      this.loadAppropriateData(args);
    }
  }

  render() {
    return (
      <SpendingFormView
        oldestDate={this.state.oldestDate}
        newestDate={this.state.newestDate}
        unit={this.state.unit}
        setOldest={this.setOldest}
        setNewest={this.setNewest}
        setUnit={this.setUnit}
        submitForm={this.submitForm}
        outOfOrder={this.state.outOfOrder}
        wrongUnit={this.state.wrongUnit}
        errorMessage={this.state.errorMessage}
      />
    );
  }
}

export default SpendingFormContainer;
