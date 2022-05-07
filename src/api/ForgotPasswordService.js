import axios from "axios"
import { API_URL } from '../Constants'

class ForgotPasswordService {


    resetPassword(email, password) {
       return axios.post(`${API_URL}/resetPassword`, {email, password})
    }

}

export default new ForgotPasswordService