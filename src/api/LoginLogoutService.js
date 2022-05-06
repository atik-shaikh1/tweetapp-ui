import axios from 'axios'

class LoginLogoutService {


    login(email, password) {
        console.log('inside login', email, password)

        return axios.post('http://localhost:8080/login', 
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

        return axios.post('http://localhost:8080/logout', 
            { 
                "email" : user.email
            }
        )
    }


}

export default new LoginLogoutService()