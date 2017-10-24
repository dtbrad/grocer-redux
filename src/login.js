import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange(event) {
		this.setState({ [event.type]: event.value });
	}

  handleSubmit(event) {
    event.preventDefault();
    if(this.validateForm()) {
      this.props.login(this.state.email, this.state.password)
    }
    else {alert("nope")}
  }


  render() {
    return (
      <div className="col-md-6 col-md-offset-3 panel panel-default devise-bs">
        <br/>
        <h4 className="text-center">Log In</h4>
        <div className="panel-body">

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input className="form-control"
                     value={this.state.email }
                     ref={(ref) => {this.input = ref}}
                     type="email"
                     onChange={event => this.handleChange(event.target)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input className="form-control"
                     type="password"
                     ref={(ref) => {this.input = ref}}
                     onChange={event => this.handleChange(event.target)}
                     />
            </div>
            <input type="submit" className="btn btn-primary btn-block"/>
          </form>
        </div>
      </div>
    );
  }
}
