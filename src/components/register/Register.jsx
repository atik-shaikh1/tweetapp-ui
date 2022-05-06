import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { Component } from 'react'
import RegisterService from '../../api/RegisterService'
import moment from 'moment'
import validator from 'validator'
import AuthenticationService from '../../api/AuthenticationService'
import RegisterCss from './Register.module.css'

class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            'firstName': 'Atik',
            'lastName': 'Shaikh',
            'email': 'shaikhatikrajjak@gmail.com',
            'password': '',
            'gender': '',
            'birthdate': '',
            'error': '',
            userExists: false,
            'userExistsMessage': ''
        }

        this.register = this.register.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

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

    checkPassword(password) {

        if (!password) return false;

        if (password.length < 4 || password.length > 10) return false;

        return true;
    }

    validate(values) {

        let errors = {}
        console.log(this.state)
        console.log(this.state.userExists)
       
        if (!values.firstName) {
            errors.firstName = 'Enter your first name'
        } else if (!values.lastName) {
            errors.lastName = 'Enter your last name'
        }
        else if (!values.email) {
            errors.email = 'Enter your email'
        }
        else if (!validator.isEmail(values.email)) {
            errors.email = 'Enter valid email'
        }
        else if (!values.lastName) {
            errors.lastName = 'Enter your last name'
        }
        else if (!values.password) {
            errors.password = 'Enter your password'
        }
        else if (values.password.testPassword(values.password)) {
            errors.password = 'Password should be 4 to 10 character long with one special character, one lowercase and one uppercase'
        }
        else if (!moment(values.birthdate).isValid()) {
            errors.birthdate = 'Enter a valid birthdate'
        }

        return errors

    }

    register() {
        RegisterService.register();
    }

    onSubmit(values) {

        RegisterService.register(values)
            .then(response => {
                console.log(response.data)
                if (response.data.email == values.email) {
                    console.log('Registered')
                    AuthenticationService.login(response.data)
                    this.props.history.push(`/welcome`)

                } 
                else if (response.data.email === null) {
                    console.log('user exists')
                    this.setState({userExists: true, userExistsMessage: 'User already exists'})
                    
                }
                else {
                    console.log('Registration Failed')
                    this.setState({error: 'Registration Failed'})
                }
            })
            .catch(e => {
                console.log('Registration Failed')
                this.setState({error: 'Registration Failed'})
            });
    }

    render() {

        let { firstName, lastName, email, password, gender, birthdate } = this.state

        // console.log({ firstName, lastName, email, password, gender, birthdate })

        return (
            <>
                 {/* {this.state.userExists && <span>{this.state.userExistsMessage}</span>} */}
                 {this.state.userExists && <div className="alert alert-warning">{this.state.userExistsMessage}</div>}

                <Formik
                    initialValues={{ firstName, lastName, email, password, gender, birthdate }}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="firstName" component="div" className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>First Name</label>
                                    <Field className="form-control" type="text" name="firstName" />
                                </fieldset>

                                <ErrorMessage name="lastName" component="div" className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>Last Name</label>
                                    <Field className="form-control" type="text" name="lastName" />
                                </fieldset>

                               
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

                                <ErrorMessage name="gender" component="div" className="alert alert-warning" />
                                <div className='input-group' role="group">
                                    <div>
                                        <label>Gender</label>
                                        <div>
                                            <label className="input-group-text radio">
                                                <Field type="radio" name="gender" value="Male" />
                                                Male
                                            </label>
                                            <label className="input-group-text radio">
                                                <Field type="radio" name="gender" value="Female" />
                                                Female
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <ErrorMessage name="birthdate" component="div" className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>birthdate</label>
                                    <Field className="form-control" type="date" name="birthdate" />
                                </fieldset>
                                <button className="btn btn-success" type="submit">Register</button>
                            </Form>
                        )
                    }
                </Formik>
            </>
        );

    }

}

export default Register