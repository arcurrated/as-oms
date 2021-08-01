module.exports = app =>{
	const operations = require('../controllers/operation.controller.js')
	var router = require('express').Router()
	const middlewares = require('../middlewares')

	router.use(middlewares.auth.verifyToken)
	router.use(middlewares.auth.isModer)

	router.get('/', operations.findAll)
	router.get('/:id', operations.findOne)
	router.put('/:id', operations.update)
	router.delete('/:id', operations.deleteOne)

	app.use('/api/operations', router)
}