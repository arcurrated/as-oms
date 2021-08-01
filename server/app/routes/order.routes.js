module.exports = app => {
	const orders = require('../controllers/order.controller.js')
	var router = require('express').Router()
	const middlewares = require('../middlewares')

	router.use(middlewares.auth.verifyToken)
	router.use(middlewares.auth.isModer)

	router.post('/', [ middlewares.order.verifyAndPreprocessOrder ], orders.create)
	router.get('/', orders.findAll)
	router.get('/:id', orders.findOne)
	router.put('/:id', [ middlewares.order.verifyAndPreprocessOrder ], orders.update)
	router.delete('/:id', orders.deleteOne)

	app.use('/api/orders', router)
}