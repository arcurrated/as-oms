module.exports = app =>{
	const commons = require('../controllers/commons.controller.js')
	var router = require('express').Router()
	const middlewares = require('../middlewares')

	router.use(middlewares.auth.verifyToken)
	router.get('/', [middlewares.auth.isModer,], commons.findOne)
	router.put('/', [middlewares.auth.isAdmin,], commons.update)

	app.use('/api/commons', router)
}