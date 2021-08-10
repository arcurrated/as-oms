module.exports = app => {
	const serviceSet = require('../controllers/serviceSet.controller.js')
	var router = require('express').Router()
	const middlewares = require('../middlewares')

	router.use(middlewares.auth.verifyToken)
	router.use(middlewares.auth.isModer)

	router.post('/', [ middlewares.serviceSet.verifyAndPreprocess ], serviceSet.create)
	router.get('/', serviceSet.findAll)
	router.get('/:id', serviceSet.findOne)
	router.put('/:id', [ middlewares.serviceSet.verifyAndPreprocess ], serviceSet.update)
	router.delete('/:id', serviceSet.deleteOne)

	app.use('/api/servicesets', router)
}