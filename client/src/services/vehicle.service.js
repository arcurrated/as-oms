import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://10.0.0.169:8080/api/vehicles'

class VehicleService {
	getAllVehicles(page, perPage, sort, filter){
		const data = JSON.stringify({
			sort,
			filter,
		})
		return axios.get(`${API_URL}?page=${page}&perPage=${perPage}&body=${data}`, {
			headers: authHeader(),
		})
	}
}


export default new VehicleService()