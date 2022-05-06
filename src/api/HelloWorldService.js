import axios from 'axios'

class HelloWorldService {


    helloWorld() {
        console.log('inside helloWorld')

        

        return axios.get('http://localhost:8080/hello-world');
            

        
    }



}

export default new HelloWorldService()