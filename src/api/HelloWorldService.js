import axios from 'axios'
import { API_URL } from '../Constants'

class HelloWorldService {


    helloWorld() {
        console.log('inside helloWorld')

        

        return axios.get(`${API_URL}/hello-world`);
            

        
    }



}

export default new HelloWorldService()