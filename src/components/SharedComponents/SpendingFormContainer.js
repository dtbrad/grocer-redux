import React, { Component } from 'react';
import SpendingFormView from './SpendingFormView';

class SpendingFormContainer extends Component {
  state = {
    oldestDate: this.props.oldestDate,
    newestDate: this.props.newestDate,
    unit: this.props.unit || 'month',
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      oldestDate: nextProps.oldestDate,
      newestDate: nextProps.newestDate,
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
    console.log(this.state)
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
