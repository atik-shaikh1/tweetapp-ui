import axios from 'axios';

class UserService {

    getAllUsers() {
        return axios.get('http://localhost:8080/api/v1.0/tweets/users/all')
    }

}

export default new UserService()