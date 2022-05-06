import React, { Component } from 'react'
import TweetService from '../../api/TweetService'
import AllTweetsComponent from './AllTweetsComponent'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class EditTweetComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tweet: this.props.tweet.tweet,
            responseMessage: '',
            errorMessage: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.editTweet = this.editTweet.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    editTweet() {

        if (this.state.tweet == '') {
            this.setState({ errorMessage: 'Please enter a tweet' })
            return
        }

        this.setState({ errorMessage: '' })

        console.log(this.state.tweet)


        let tweetObj = this.props.tweet;
        tweetObj.tweet = this.state.tweet // update tweet text

        console.log('tweetObj', tweetObj)

        TweetService.updateTweet(this.props.id, tweetObj)
            .then(response => {


                let editedTweet = response.data

                console.log(editedTweet)

                if (editedTweet != null) {
                    this.setState({ responseMessage: "edited" })

                    console.log(editedTweet)
                    this.props.getAllTweets()
                }

                else {
                    this.setState({ responseMessage: "editing tweet failed" })
                }

            })
            .catch(error => {
                this.setState({ responseMessage: "editing tweet failed" })
            });

    }

    componentDidMount() {
        // this.props.tweet
    }

    render() {
        return (
            <div className="EditTweetComponent">
                {/* <div>{this.state.errorMessage}</div> */}

                <input placeholder='tweet' value={this.state.tweet} name="tweet" onChange={this.handleChange}></input>
                <button onClick={this.editTweet}>Edit Tweet</button>

            </div>
        )
    };
}

export default EditTweetComponent;
