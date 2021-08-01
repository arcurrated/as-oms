module.exports = app => {
	const { auth } = require('../middlewares')
	const controller = require('../controllers/auth.controller')
	var router = require('express').Router()

	app.use((req, res, next) => {
		res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-type, Accept")
		next()
	})

	app.get('/api/users', [ auth.verifyToken, auth.isAdmin ], controller.findAll)
	app.delete('/api/users/:username', [ auth.verifyToken, auth.isAdmin ], controller.deleteOne)
	app.put("/api/users/setrole", [ auth.verifyToken, auth.isAdmin ], controller.setRole)
	app.put("/api/users/setpassword", [ auth.verifyToken ], controller.setPassword)
	
	router.post("/signup", [ auth.checkDublicateUsername, ], controller.signUp)
	router.post("/signin", controller.signIn)

	app.use('/api/auth', router)
}