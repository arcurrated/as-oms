import axios from 'axios'
import authHeader from './auth-header'

const domain = process.env.VUE_APP_API_DOMAIN || 'http://10.0.0.169:8080'
const API_URL = domain + '/api/payers'

class PayerService {
	getAllPayers(page, perPage, sort, filter){
		const data = JSON.stringify({
			sort,
			filter,
		})
		return axios.get(`${API_URL}?page=${page}&perPage=${perPage}&body=${data}`, {
			headers: authHeader(),
		})
	}
	getById(id){
		return axios.get(`${API_URL}/${id}`, {
			headers: authHeader(),
		})
	}
	update(id, client){
		return axios.put(`${API_URL}/${id}`, client, {
			headers: authHeader(),
		})
	}
	remove(id){
		return axios.delete(`${API_URL}/${id}`, {
			headers: authHeader(),
		})
	}
}


export default new PayerService()