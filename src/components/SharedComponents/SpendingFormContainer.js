import React, { Component } from 'react';
import moment from 'moment';
import SpendingFormView from './SpendingFormView';

class SpendingFormContainer extends Component {
  state = {
    oldestDate: moment(this.props.oldestDate),
    newestDate: moment(this.props.newestDate),
    unit: this.props.unit || 'month',
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      oldestDate: moment(nextProps.oldestDate),
      newestDate: moment(nextProps.newestDate),
      unit: nextProps.unit || 'month',
    });
  }

  setOldest = async (date) => {
    await this.setState({ oldestDate: date });
    // this.checkErrors();
  }

  setNewest = async (date) => {
    await this.setState({ newestDate: date });
    // this.checkErrors();
  }

   setUnit = async (dan) => {
     await this.setState({ unit: dan.target.value });
     // this.checkErrors();
   }

  submitForm = (f) => {
    f.preventDefault()
    const args = { oldestDate: this.state.oldestDate._d, newestDate: this.state.newestDate._d, unit: this.state.unit, resourceName: 'baskets', desc: true, page: 1 }
    this.props.loadSpendingTable(args);
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
      />
    );
  }
}

export default SpendingFormContainer;
