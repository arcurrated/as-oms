import axios from 'axios'
import authHeader from './auth-header'

const domain = process.env.VUE_APP_API_DOMAIN || 'http://10.0.0.169:8080'
const API_URL = domain + '/api/servicesets'

class ServiceSetService {
	create(serviceSet){
		return axios.post(API_URL, serviceSet, {
			headers: authHeader(),
		})
	}
	getAll(page, perPage, sort, filter){
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
	update(id, serviceSet){
		return axios.put(`${API_URL}/${id}`, serviceSet, {
			headers: authHeader(),
		})
	}
	remove(id){
		return axios.delete(`${API_URL}/${id}`, {
			headers: authHeader(),
		})
	}
}


export default new ServiceSetService()