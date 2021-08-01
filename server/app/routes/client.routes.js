module.exports = app => {
	const clients = require('../controllers/client.controller.js')
	var router = require('express').Router()
	const middlewares = require('../middlewares')

	router.use(middlewares.auth.verifyToken)
	router.use(middlewares.auth.isModer)

	router.get('/', clients.findAll)
	router.get('/:id', clients.findOne)
	router.put('/:id', clients.update)
	router.delete('/:id', clients.deleteOne)

	app.use('/api/clients', router)
}