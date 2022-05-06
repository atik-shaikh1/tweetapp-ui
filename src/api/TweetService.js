import axios from 'axios';
import { v4 as uuid } from 'uuid';

class TweetService {

    tweet(tweet) {
        let savedUserJsonString = sessionStorage['loggedInUser'];
    
        let user = JSON.parse(savedUserJsonString);
        
        return axios.post('http://localhost:8080/post/tweet', 
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

        return axios.get(`http://localhost:8080/myTweets/${user.email}`)
    }

    getUserTweets(email) {

        return axios.get(`http://localhost:8080/myTweets/${email}`)
    }

    getAllTweets() {
        return axios.get(`http://localhost:8080/tweets/all`)
    }

    replyTweet(id, tweet) {
        let savedUserJsonString = sessionStorage['loggedInUser'];
    
        let user = JSON.parse(savedUserJsonString);
        
        return axios.post(`http://localhost:8080/reply/tweet/${id}`, 
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
        return axios.post(`http://localhost:8080/tweet/replies/${id}`)
    }

    likeTweet(id) {
        let savedUserJsonString = sessionStorage['loggedInUser'];
    
        let user = JSON.parse(savedUserJsonString);

        return axios.post(`http://localhost:8080/tweet/like/${id}`, 
        {
            
            "firstName": user.firstName, 
            "lastName" : user.lastName, 
            "email": user.email 
            
        })
    }

    updateTweet(id, tweet) {

        let savedUserJsonString = sessionStorage['loggedInUser'];
    
        let user = JSON.parse(savedUserJsonString);
        
        return axios.put('http://localhost:8080/update/tweet', tweet)


    }

    deleteTweet(id) {
        return axios.delete(`http://localhost:8080/delete/tweet/${id}`)
    }
    
}

export default new TweetService()