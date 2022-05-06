import React, { Component } from 'react'
import HelloWorldService from '../api/HelloWorldService';
import AllTweetsomponent from './Tweet/AllTweetsComponent';
import LogoutComponent from './LoginLogout/LogoutComponent';
import PostTweetomponent from './Tweet/PostTweetComponent';
import WelcomeService from '../api/WelcomeService';
import WelcomeCss from './Welcome.module.css'
import UserComponent from './Users/UserComponent';
import { Link } from 'react-router-dom';

class WelcomeComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      message: '',
      post: '',
      firstName: '',
      lastName: ''
    }

    this.showMessage = this.showMessage.bind(this)
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

  showMessage() {
    console.log('inside showMessage')
    let msg = HelloWorldService.helloWorld()
      .then(response => this.setState({ message: response.data }));
  }

  componentDidMount() {
    let user = WelcomeService.loggedInUser();
    this.setState({firstName: user.firstName, lastName: user.lastName})
  }

  render() {
    return (
      <div className="WelcomeComponent">
        

        <div>
        <span className={WelcomeCss.hello}>Hi, {this.state.firstName} {this.state.lastName} </span>
        <span><Link className={WelcomeCss.showUsers} to="/users">Show Users</Link></span>
        <LogoutComponent></LogoutComponent>
        </div>

        {/* <div>{this.state.message}</div>
        <button onClick={this.showMessage}>Show Message</button> */}
        <AllTweetsomponent history={this.props.history}></AllTweetsomponent>
      </div>
    )
  };
}

export default WelcomeComponent;
