import axios from 'axios';
import { v4 as uuid } from 'uuid';

class WelcomeService {

    

    loggedInUser(id) {
        let savedUserJsonString = sessionStorage['loggedInUser'];
    
        let user = JSON.parse(savedUserJsonString);

        return user;
    }
    
}

export default new WelcomeService()