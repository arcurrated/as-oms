import axios from 'axios';
import authHeader from './auth-header'

const API_URL = 'http://10.0.0.169:8080/api/commons'

class CommonsService {
	get(){
		return axios.get(API_URL, {
			headers: authHeader(),
		})
	}

	update(commons){
		return axios.put(API_URL, commons, {
			headers: authHeader(),
		})
	}
}

export default new CommonsService();