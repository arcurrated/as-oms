const order = require('./order.middleware.js')
const auth = require('./auth.middleware.js')

module.exports = {
	order,
	auth
}