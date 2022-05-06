import axios from "axios"

class ForgotPasswordService {


    resetPassword(email, password) {
       return axios.post(`http://localhost:8080/resetPassword`, {email, password})
    }

}

export default new ForgotPasswordService