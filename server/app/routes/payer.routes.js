module.exports = app => {
	const payers = require('../controllers/payer.controller.js')
	var router = require('express').Router()
	const middlewares = require('../middlewares')

	router.use(middlewares.auth.verifyToken)
	router.use(middlewares.auth.isModer)

	router.get('/', payers.findAll)
	router.get('/:id', payers.findOne)
	router.put('/:id', payers.update)
	router.delete('/:id', payers.deleteOne)

	app.use('/api/payers', router)
}