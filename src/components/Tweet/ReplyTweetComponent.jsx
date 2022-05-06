import React, { Component } from 'react'
import TweetService from '../../api/TweetService'
import AllTweetsComponent from './AllTweetsComponent'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ReplyTweetComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tweet: '',
      responseMessage: '',
      errorMessage: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.replyTweet = this.replyTweet.bind(this)
  }

  handleChange(event) {
    this.setState(
      {
        [event.target.name]
          : event.target.value
      }
    )
  }

  replyTweet() {

    if (this.state.tweet == '') {
      this.setState({errorMessage: 'Please enter a tweet'})
      return
    }

    this.setState({errorMessage: ''})

    console.log(this.state.tweet)
    TweetService.replyTweet(this.props.id, this.state.tweet)
      .then(response => {


        let repliesList = response.data

        console.log(repliesList)

        if (repliesList != null) {
          this.setState({ responseMessage: "Posted" })

          this.props.tweetReplies(repliesList)
          console.log(repliesList)
          
        }

        else {
          this.setState({ responseMessage: "Posting tweet failed" })
        }

      })
      .catch(error => {
        this.setState({ responseMessage: "Posting tweet failed" })
      });
    //   this.props.history.push(`/welcome`)
  }

  render() {
    return (
      <div className="ReplyTweetComponent">
        {/* <div>{this.state.errorMessage}</div> */}
        <input placeholder='tweet' value={this.state.post} name="tweet" onChange={this.handleChange}></input>
        <button onClick={this.replyTweet}>Reply Tweet</button>
        
        {/* {toast.warning(this.state.responseMessage, {autoClose:5000})} */}

      </div>
    )
  };
}

export default ReplyTweetComponent;
