import axios from 'axios'
import authHeader from './auth-header'

const domain = process.env.API_DOMAIN || 'http://10.0.0.169:8080'
const API_URL = domain + '/api/clients'

class ClientService {
	getAllClients(page, perPage, sort, filter){
		const data = JSON.stringify({
			sort,
			filter,
		})
		return axios.get(`${API_URL}?page=${page}&perPage=${perPage}&body=${data}`, {
			headers: authHeader(),
		})
	}
}


export default new ClientService()