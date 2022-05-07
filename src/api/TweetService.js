import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { API_URL } from '../Constants'

class TweetService {

    tweet(tweet) {
        let savedUserJsonString = sessionStorage['loggedInUser'];
    
        let user = JSON.parse(savedUserJsonString);
        
        return axios.post(`${API_URL}/post/tweet`, 
            {
                "id": uuid(),
                'tweet': tweet, 
                "user": { 
                    "firstName": user.firstName, 
                    "lastName" : user.lastName, 
                    "email": user.email 
                } 
            }
        )
    }

    myTweets() {
        let savedUserJsonString = sessionStorage['loggedInUser'];

        if (savedUserJsonString == null) return null;
    
        let user = JSON.parse(savedUserJsonString);

        return axios.get(`${API_URL}/myTweets/${user.email}`)
    }

    getUserTweets(email) {

        return axios.get(`${API_URL}/myTweets/${email}`)
    }

    getAllTweets() {
        return axios.get(`${API_URL}/tweets/all`)
    }

    replyTweet(id, tweet) {
        let savedUserJsonString = sessionStorage['loggedInUser'];
    
        let user = JSON.parse(savedUserJsonString);
        
        return axios.post(`${API_URL}/reply/tweet/${id}`, 
            {
                "id": uuid(),
                'tweet': tweet, 
                "user": { 
                    "firstName": user.firstName, 
                    "lastName" : user.lastName, 
                    "email": user.email 
                } 
            }
        )
    }

    getReplies(id) {
        return axios.post(`${API_URL}/tweet/replies/${id}`)
    }

    likeTweet(id) {
        let savedUserJsonString = sessionStorage['loggedInUser'];
    
        let user = JSON.parse(savedUserJsonString);

        return axios.post(`${API_URL}/tweet/like/${id}`, 
        {
            
            "firstName": user.firstName, 
            "lastName" : user.lastName, 
            "email": user.email 
            
        })
    }

    updateTweet(id, tweet) {

        let savedUserJsonString = sessionStorage['loggedInUser'];
    
        let user = JSON.parse(savedUserJsonString);
        
        return axios.put(`${API_URL}/update/tweet`, tweet)


    }

    deleteTweet(id) {
        return axios.delete(`${API_URL}/delete/tweet/${id}`)
    }
    
}

export default new TweetService()