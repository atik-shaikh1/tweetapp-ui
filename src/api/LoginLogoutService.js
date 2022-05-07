import axios from 'axios'
import { API_URL } from '../Constants'

class LoginLogoutService {


    login(email, password) {
        console.log('inside login', email, password)

        return axios.post(`${API_URL}/login`, 
            {
                "email" : email, 
                "password" : password
            }
        )
    }

    logout() {

        let savedUserJsonString = sessionStorage['loggedInUser'];

        if (savedUserJsonString == null) return false;
    
        let user = JSON.parse(savedUserJsonString);

        console.log("log out ", user)

        return axios.post(`${API_URL}/logout`, 
            { 
                "email" : user.email
            }
        )
    }


}

export default new LoginLogoutService()