import axios from 'axios';
import { API_URL } from '../Constants'

class UserService {

    getAllUsers() {
        return axios.get(`${API_URL}/api/v1.0/tweets/users/all`)
    }

}

export default new UserService()