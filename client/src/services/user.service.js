import axios from 'axios';
import authHeader from './auth-header'

const API_URL = 'http://10.0.0.169:8080/api/users'

class UserService {
	getAllUsers(){
		return axios.get(API_URL, {
			headers: authHeader(),
		})
	}

	deleteUser(username){
		return axios.delete(`${API_URL}/${username}`, {
			headers: authHeader(),
		})
	}

	setPassword(data){
		return axios.put(`${API_URL}/setpassword`, data, {
			headers: authHeader(),
		})
	}

	setRole(data){
		return axios.put(`${API_URL}/setrole`, data, {
			headers: authHeader(),
		})
	}
}

export default new UserService();