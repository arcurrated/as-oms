module.exports = app =>{
	const commons = require('../controllers/commons.controller.js')
	var router = require('express').Router()
	const middlewares = require('../middlewares')

	router.use(middlewares.auth.verifyToken)
	router.use(middlewares.auth.isAdmin)
	router.get('/', commons.findOne)
	router.put('/', commons.update)

	app.use('/api/commons', router)
}