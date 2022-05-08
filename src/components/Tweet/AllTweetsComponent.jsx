import React, { Component } from 'react'
import TweetService from '../../api/TweetService'
import moment from 'moment'
import PostTweetComponent from './PostTweetComponent'
import TweetCss from './Tweets.module.css'
import ReplyTweetComponent from './ReplyTweetComponent'
import WelcomeService from '../../api/WelcomeService'
import EditTweetComponent from './EditTweetComponent'
import { FaRegComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai"




class AllTweetsComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tweets: [],
            showReplyView: false,
            showReplyViewForId: '',
            showReplies: false,
            mainTweet: null,
            replies: [],
            noReplies: false,
            loggedInUser: null,
            editTweetView: false,
            editTweetForId: ''
        }

        this.likeTweet = this.likeTweet.bind(this)
        this.userTweets = this.userTweets.bind(this)
        this.getAllTweets = this.getAllTweets.bind(this)
        this.reply = this.reply.bind(this)
        this.replies = this.replies.bind(this)
        this.getReplies = this.getReplies.bind(this)
        this.editTweet = this.editTweet.bind(this)
        this.deleteTweet = this.deleteTweet.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.getAllTweets();
        console.log(this.state)

        let user = WelcomeService.loggedInUser();
        this.setState({ loggedInUser: user })

        console.log(this.state)
    }

    getAllTweets() {

        TweetService.getAllTweets()
            .then(response => {
                console.log(response)
                console.log(response.data)

                this.setState({
                    tweets: response.data,
                    showReplies: false,
                    showReplyView: false,
                    noReplies: false,
                    editTweetView: false
                })

                console.log("all tweets")
                console.log(this.state)

            }).catch(error => {

            })
    }

    userTweets(tweet) {
        console.log(tweet.user.email)

        TweetService.getUserTweets(tweet.user.email)
            .then(response => {
                console.log(response)
                console.log(response.data.tweets)

                this.setState({ tweets: response.data })
                console.log("all tweets")
                console.log(this.state)

            }).catch(error => {

            })
    }

    reply(id, tweet) {
        console.log(id)
        this.setState({ showReplyView: true, showReplyViewForId: id, mainTweet: tweet })
    }

    replies(repliesList) {
        console.log(repliesList)
        this.setState({ showReplies: true, tweets: repliesList })
        console.log(this.state.replies)
    }

    getReplies(id, tweet) {
        console.log(id)
        console.log(tweet)
        console.log(this.state)

        TweetService.getReplies(id)
            .then(response => {

                console.log(response.data)

                let noReplies = false

                let replies = null;

                if (!response.data) {
                    replies = null
                    noReplies = true
                } else {
                    replies = response.data
                }

                this.setState({ showReplies: true, tweets: replies, mainTweet: tweet, noReplies })
                console.log(this.state)

            }).catch(error => {

            });
    }

    likeTweet(id) {
        TweetService.likeTweet(id)
            .then(response => {
                this.getAllTweets();
            })
            .catch(error => {

            })
    }

    editTweet(id, tweet) {
        console.log('edit tweet')

        this.setState({ editTweetView: true, editTweetForId: id })
    }

    deleteTweet(id) {
        TweetService.deleteTweet(id)
            .then(response => {
                this.getAllTweets()
            })

    }

    render() {
        return (
            <div className="AllTweetsomponent">
                <div className={TweetCss.homeBtn}>
                    <span onClick={this.getAllTweets}><AiFillHome className={`${TweetCss.icons} ${TweetCss.homeIcon}`}></AiFillHome></span>
                </div>
                <PostTweetComponent history={this.props.history} update={this.getAllTweets}></PostTweetComponent>

                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}

                {this.state.showReplies && this.state.mainTweet != null &&
                    <div>
                        <div className={TweetCss.tweet}>
                            <div>
                                <span className={TweetCss.userName} onClick={() => this.userTweets(this.state.mainTweet)}>
                                    <b>{this.state.mainTweet.user.firstName} {this.state.mainTweet.user.lastName}</b>
                                </span>
                                <span  className={TweetCss.fromNow}>{moment(this.state.mainTweet.postTime).from(new Date())}</span>
                            </div>
                            <div className={TweetCss.tweetText}>{this.state.mainTweet.tweet}</div>
                        </div>
                        <h5>Replies</h5>
                    </div>

                }

                {this.state.noReplies && <div>No Replies yet</div>}



                {this.state.tweets != null && this.state.tweets.sort((a, b) => a.postTime - b.postTime)
                    .reverse()
                    .map(tweet =>
                        <div className={TweetCss.tweet}>
                            <div className={this.state.showReplies == true ? TweetCss.repliesOuterDiv : ''}>
                                <div className={this.state.showReplies == true ? TweetCss.repliesInnerDiv : ''}>
                                    <span>
                                        <span className={TweetCss.userName} onClick={() => this.userTweets(tweet)}>
                                            <b>{tweet.user.firstName} {tweet.user.lastName}</b>

                                        </span>
                                        <span className={TweetCss.fromNow}>{moment(tweet.postTime).fromNow()}</span>
                                    </span>


                                    {this.state.editTweetView && this.state.editTweetForId == tweet.id && !this.state.showReplies ?
                                        <EditTweetComponent tweet={tweet} getAllTweets={this.getAllTweets}></EditTweetComponent>
                                        :
                                        <span className={TweetCss.editDeleteIconOuterSpan}>
                                            {!this.state.showReplies &&
                                                <span className={TweetCss.editDeleteIcon}>
                                                    <span onClick={() => this.editTweet(tweet.id, tweet)}><MdOutlineModeEdit className={`${TweetCss.icons}`} /></span>
                                                    <span onClick={() => this.deleteTweet(tweet.id)}><RiDeleteBinLine className={`${TweetCss.icons}`} /></span>
                                                </span>
                                            }
                                            <div className={TweetCss.tweetText}>{tweet.tweet}</div>
                                        </span>

                                    }





                                    {!this.state.showReplies &&
                                        <div className={TweetCss.iconsAndShowReply}>
                                            <span onClick={() => this.likeTweet(tweet.id)}>

                                                {
                                                    // Object.values(tweet.likes.users).includes("test1")

                                                    tweet.likes != null && tweet.likes.users.some(user => user.email == this.state.loggedInUser.email) ?

                                                        <span><AiFillLike className={TweetCss.icons} /></span> : <span><BiLike className={TweetCss.icons} /></span>

                                                }

                                            </span>

                                            <span className={TweetCss.likesCount}>{(tweet.likes != null) ? tweet.likes.count : 0}</span>
                                            <span onClick={() => this.reply(tweet.id, tweet)}><FaRegComment className={TweetCss.icons} /></span>
                                            <span className={TweetCss.showReplies} onClick={() => this.getReplies(tweet.id, tweet)}>show replies</span>


                                        </div>
                                    }

                                    {this.state.showReplyView && this.state.showReplyViewForId == tweet.id && !this.state.showReplies &&
                                        <ReplyTweetComponent id={tweet.id} tweetReplies={this.replies}></ReplyTweetComponent>
                                    }
                                </div>

                            </div>
                        </div>
                    )
                }

            </div>
        )
    };
}

export default AllTweetsComponent;
