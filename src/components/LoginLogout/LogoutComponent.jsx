// import React from 'react'
import AuthenticationService from '../../api/AuthenticationService'
import LoginLogoutService from '../../api/LoginLogoutService'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import LoginLogoutService from '../api/LoginLogoutService'
import LogoutCss from '../LoginLogout/Logout.module.css'

class LogoutComponent extends Component {

    constructor(props) {
      super(props)
  
      this.state = {
        message: ''
      }
  
      this.logout = this.logout.bind(this)
    }
  
    logout() {
        console.log('LogoutComponent.logout()')
        LoginLogoutService.logout()
        .then(response => {
            console.log('LogoutComponent.logout() ', response)
            if (response.data == 'logged out') {
              console.log(response.data)
                this.setState({message: 'logged out'})
                // setTimeout(2000);
                // this.props.history.push(`/login`)
            }
        })
        .catch(error => {
          this.setState({message: 'logout failed'})
          console.log(error)
        });
    }

    render() {
      return (
        <div className={LogoutCss.LogoutComponent}>
            {/* <div>{this.state.message}</div> */}
          <button  className={LogoutCss.logout} onClick={this.logout}><Link to="/login">Logout</Link></button>
        </div>
      )
    };
}

export default LogoutComponent