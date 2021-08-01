module.exports = app => {
	const parts = require('../controllers/part.controller.js')
	var router = require('express').Router()
	const middlewares = require('../middlewares')

	router.use(middlewares.auth.verifyToken)
	router.use(middlewares.auth.isModer)

	router.get('/', parts.findAll)
	router.get('/:id', parts.findOne)
	router.get('/h/autofill', parts.autofill)
	router.put('/:id', parts.update)
	router.delete('/:id', parts.deleteOne)

	app.use('/api/parts', router)
}