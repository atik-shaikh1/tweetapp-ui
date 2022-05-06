import React, { Component } from 'react'
import HelloWorldService from '../../api/HelloWorldService';
import LoginLogoutService from '../../api/LoginLogoutService';
import AuthenticationService from '../../api/AuthenticationService';

class LoginComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      message: '',
      isLoggedIn: false,
      invalidCredentials: false
    }

    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
    this.forgotPassword = this.forgotPassword.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState(
      {
        [event.target.name]
          : event.target.value
      }
    )
  }

  forgotPassword() {
    this.props.forgotPassword();
  }

  login() {
    console.log('inside login')
    LoginLogoutService.login(this.state.email, this.state.password)
      .then(response => {

        if (response.data != null && response.data.email == this.state.email) {
          console.log(response.data)
          AuthenticationService.login(response.data)
          this.props.history.push(`/welcome`)
          this.setState({ message: response.data, isLoggedIn: true })
        } else {
          this.setState({ message: response.data, invalidCredentials: true })
        }

      })
      .catch(error => {
        this.setState({ message: error.data, invalidCredentials: true })
      });
  }

  register() {
    this.props.history.push(`/register`)
  }

  render() {

    return (
      <div className="LoginComponent">

        {/* {message != '' && <div className="alert alert—check">{message}</div>} */}

        {/* <h1>Tweet App</h1> */}

        <h3>Welcome</h3>

        <div>
          {this.state.isLoggedIn && <div className="alert alert-warning">Login Sucessful</div>}
          {this.state.invalidCredentials && <div className="alert alert-warning">Invalid Credentials</div>}

          <fieldset className="form-group">
            <input className="form-control" placeholder='Email' value={this.state.email} name="email" onChange={this.handleChange}></input>
          </fieldset>

          <fieldset className="form-group">
            <input className="form-control" placeholder='Password' value={this.state.password} name="password" onChange={this.handleChange}></input>
          </fieldset>

          <fieldset className="form-group">
            <button className='btn btn-success' onClick={this.login}>Login</button>
          </fieldset>

          <fieldset className="form-group">
            <span>New User? </span>
            <button className='btn btn-success' onClick={this.register}>Register</button>
            <span>Forgot Password? </span>
            <button className='btn btn-success' onClick={this.forgotPassword}>Reset Password</button>
          </fieldset>
        </div>

        <div>{this.state.message}</div>


      </div>
    )
  };
}

export default LoginComponent;
