import axios from 'axios';
import authHeader from './auth-header'

const domain = process.env.API_DOMAIN || 'http://10.0.0.169:8080'
const API_URL = domain + '/api/commons'

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