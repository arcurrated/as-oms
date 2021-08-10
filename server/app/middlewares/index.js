const order = require('./order.middleware.js')
const serviceSet = require('./serviceSet.middleware.js')
const auth = require('./auth.middleware.js')

module.exports = {
	order,
	auth,
	serviceSet,
}