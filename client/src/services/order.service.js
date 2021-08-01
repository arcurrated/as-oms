import axios from 'axios'
import authHeader from './auth-header'

const domain = process.env.VUE_APP_API_DOMAIN || 'http://10.0.0.169:8080'
const API_URL = domain + '/api/orders'

class OrderService {
	create(order){
		return axios.post(API_URL, order, {
			headers: authHeader(),
		})
	}
	getAllOrders(page, perPage, sort, filter){
		const data = JSON.stringify({
			sort,
			filter,
		})
		return axios.get(`${API_URL}?page=${page}&perPage=${perPage}&body=${data}`, {
			headers: authHeader(),
		})
	}
	getLastOpenedOrders(page, perPage){
		const data = JSON.stringify({
			sort: { lastOpenedAt: -1 }, // sort fort last opened
			filter: undefined, //filter - none
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
	update(id, order){
		return axios.put(`${API_URL}/${id}`, order, {
			headers: authHeader(),
		})
	}
	deleteById(id){
		return axios.delete(`${API_URL}/${id}`, {
			headers: authHeader(),
		})
	}
}


export default new OrderService()