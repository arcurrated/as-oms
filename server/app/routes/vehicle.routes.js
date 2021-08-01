module.exports = app => {
	const vehicles = require('../controllers/vehicle.controller.js')
	var router = require('express').Router()
	const middlewares = require('../middlewares')

	router.use(middlewares.auth.verifyToken)
	router.use(middlewares.auth.isModer)

	router.get('/', vehicles.findAll)
	router.get('/:id', vehicles.findOne)
	router.put('/:id', vehicles.update)
	router.delete('/:id', vehicles.deleteOne)

	app.use('/api/vehicles', router)
}