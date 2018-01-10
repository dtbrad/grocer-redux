import React from 'react';
import { Alert, Col, Form, FormGroup, FormControl, Button, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SpendingFormView = (props) => {
  const errorAlert = (props.outOfOrder === true || props.wrongUnit === true) ? <Alert bsStyle="danger">{ props.errorMessage }</Alert> : null;

  return (
    <div>
      <Row style={{ paddingBottom: '15px' }}>
        <Form inline onSubmit={props.submitForm}>
          <Col xs={3}>
            <FormGroup
              controlId={props.dateError}
              validationState={props.outOfOrder === true ? 'error' : 'success'}
            >
              <DatePicker
                readOnly
                placeholderText={props.oldestDate}
                selected={props.oldestDate}
                onChange={props.setOldest}
                className="datepicker form-control"
                showYearDropdown
              />
            </FormGroup>
          </Col>
          <Col xs={3} >
            <FormGroup
              controlId="newestDate"
              validationState={props.outOfOrder === true ? 'error' : 'success'}
            >
              <DatePicker
                readOnly
                placeholderText={props.newestDate}
                selected={props.newestDate}
                onChange={props.setNewest}
                className="datepicker form-control"
                showYearDropdown
              />
            </FormGroup>
          </Col>
          <Col xs={3}>
            <FormGroup
              controlId="unit"
              validationState={props.wrongUnit === true ? 'error' : 'success'}
            >
              <FormControl
                componentClass="select"
                placeholder="Unit"
                defaultValue="Month"
                selected={props.unit}
                onChange={props.setUnit}
              >
                <option value="month">Month</option>
                <option value="week">Week</option>
                <option value="day">Day</option>
              </FormControl>
            </FormGroup>
          </Col>
          <Col xs={3} >
            <Button block type="submit">
              Submit
            </Button>
          </Col>
        </Form>
        <br />
      </Row>
      {errorAlert}
    </div>
  );
};

export default SpendingFormView;
