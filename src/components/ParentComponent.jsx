
import React, { Component } from 'react'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import LoginComponent from './LoginLogout/LoginComponent'


class ParentComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            message: '',
            forgotPassword: false
        }

        this.forgotPassword = this.forgotPassword.bind(this)
        this.getMessage = this.getMessage.bind(this)
    }

    forgotPassword() {
        this.setState({ forgotPassword: !this.state.forgotPassword })
    }

    getMessage(message) {
        console.log(message)
        this.setState({message})
    }


    render() {
        return (
            <div className="ParentComponent">
                {this.state.message != '' && <div>{this.state.message}</div>} 
                {!this.state.forgotPassword && <LoginComponent history={this.props.history} forgotPassword={this.forgotPassword}></LoginComponent>}
                {this.state.forgotPassword && <ForgotPassword history={this.props.history} getMessage={this.getMessage} forgotPassword={this.forgotPassword}></ForgotPassword>}
            </div>
        )
    };
}

export default ParentComponent