import React from 'react';
import { Col, Form, FormGroup, FormControl, Button, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SpendingFormView = props => (

  <Row style={{ paddingBottom: '15px' }}>
    <Form inline onSubmit={props.submitForm}>
      <Col xs={3}>
        <FormGroup controlId="oldestDate">
          <DatePicker
            placeholderText={props.oldestDate}
            selected={props.oldestDate}
            onChange={props.setOldest}
            className="datepicker form-control"
            showYearDropdown
          />
        </FormGroup>
      </Col>
      <Col xs={3} >
        <FormGroup controlId="newestDate" >
          <DatePicker
            placeholderText={props.newestDate}
            selected={props.newestDate}
            onChange={props.setNewest}
            className="datepicker form-control"
            showYearDropdown
          />
        </FormGroup>
      </Col>
      <Col xs={3}>
        <FormGroup controlId="unit">
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
);

export default SpendingFormView;
