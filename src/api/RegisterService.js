import axios from "axios"
import { API_URL } from '../Constants'

class RegisterService {

    register(user) {
        return axios.post(`${API_URL}/register`, 
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