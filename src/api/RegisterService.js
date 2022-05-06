import axios from "axios"

class RegisterService {

    register(user) {
        return axios.post('http://localhost:8080/register', 
            {
                "firstName" : user.firstName, 
                "lastName" : user.lastName,
                "email": user.email,
                "gender": user.gender,
                "password": user.password,
                "birthdate": user.birthdate,
            }
        )  
    }

}

export default new RegisterService()