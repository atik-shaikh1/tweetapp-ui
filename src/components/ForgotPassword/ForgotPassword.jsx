import React, { Component } from 'react'
import HelloWorldService from '../../api/HelloWorldService';
import LoginLogoutService from '../../api/LoginLogoutService';
import AuthenticationService from '../../api/AuthenticationService';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import ForgotPasswordService from '../../api/ForgotPasswordService';
import LoginComponent from '../LoginLogout/LoginComponent';
import { Link } from 'react-router-dom';

class ForgotPassword extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            resetFailed: false,
            resetFailedMessage: '',
            message: ''
        }

        this.validate = this.validate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
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

    validate(values) {

        let passwordPattern =
            "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()[{}]:;',?/*~$^+=<>]).{4,10}$";

        let errors = {}

        if (!values.email) {
            errors.email = 'Enter username'
        }
        else if (!values.password) {
            errors.password = 'Enter password'
        }
        else if (!values.confirmPassword) {
            errors.confirmPassword = 'Enter confirm Password'
        }
        else if (values.password != values.confirmPassword) {
            errors.confirmPassword = 'Password and confirm password must be same'
        }

        return errors

    }

    onSubmit(values) {

        console.log(values)

        ForgotPasswordService.resetPassword(values.email, values.password)
            .then(response => {
                console.log(response.data)
                if (response.data != null) {
                    let a = {message: 'Reset password successful'};
                    // this.props.history.push('/login')
                    this.props.getMessage(a.message)
                    this.props.forgotPassword()
                    console.log('here')
                }
            })
            .catch(error => {
                this.setState({resetFailed: true, resetFailedMessage: 'Invalid Credentials'})
            })
    }

    render() {

        let { email, password, confirmPassword } = this.state

        return (
            <div className="ForgotPassword">

                {this.state.resetFailed && <div className="alert alert-warning">{this.state.resetFailedMessage}</div>}

                <Formik
                    initialValues={{ email, password, confirmPassword }}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}
                >
                    {
                        (props) => (
                            <Form>


                                <ErrorMessage name="email" component="div" className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>Email</label>
                                    <Field className="form-control" type="text" name="email" />
                                </fieldset>

                                <ErrorMessage name="password" component="div" className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>Password</label>
                                    <Field className="form-control" type="text" name="password" />
                                </fieldset>

                                <ErrorMessage name="confirmPassword" component="div" className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>confirm password</label>
                                    <Field className="form-control" type="text" name="confirmPassword" />
                                </fieldset>


                                <button className="btn btn-success" type="submit">Reset</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        )
    };
}

export default ForgotPassword;
