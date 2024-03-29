import axios from 'axios';

const domain = process.env.VUE_APP_API_DOMAIN
const API_URL = domain + '/api/auth/'

class AuthService {
	login(user) {
		return axios.post(API_URL+'signin', {
			username: user.username,
			password: user.password,
		}).then(resp => {
			if(resp.data.accessToken){
				localStorage.setItem('user', JSON.stringify(resp.data))
			}
			return resp.data
		})
	}

	logout() {
		localStorage.removeItem('user')
	}

	register(user) {
		return axios.post(API_URL + 'signup', {
			username: user.username,
			password: user.password,
		})
	}
}

export default new AuthService();