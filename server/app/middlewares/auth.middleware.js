const db = require('../models')
const User = db.users
const jwt = require('jsonwebtoken')
const config = require('../config/auth.config.js')

checkDublicateUsername = (req, res, next) => {
	User.findOne({ username: req.body.username }).then(data => {
		if(data){
			res.status(409).send({ message: "Username already exist" })
			return
		}

		next()
	}).catch(err => {
		res.status(500).send({ message: err.message || "Server error" })
	})
}

verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token']

	if(!token){
		return res.status(403).send({ message: "No token provided" })
	}

	jwt.verify(token, config.secret, function(err, decoded){
		if(err){
			return res.status(401).send({ message: "Unathorized" })
		}
		req.userId = decoded.id
		User.findById(decoded.id).then(data => {
			if(!data){
				res.status(401).send({ message: "Unathorized" })
			} else {
				req.userRole = data.role
				req.userUsername = data.username
				next()
			}
		})
	})
}

isAdmin = (req, res, next) => {
	User.findOne({ _id: req.userId, role: { $gte: 2 } }).then(data => {
		if(!data){
			res.status(403).send({ message: "Required admin perms" })
		} else {
			next()
		}
	}).catch(err => {
		res.send({ message: err.message || "Server error" })
	})
}

isModer = (req, res, next) => {
	User.findOne({ _id: req.userId, role: { $gte: 1 } }).then(data => {
		if(!data){
			res.status(403).send({ message: "Required moder perms"})
		} else {
			next()
		}
	}).catch(err => {
		res.send({ message: err.message || "Server error" })
	})
}


module.exports = {
	checkDublicateUsername,
	verifyToken,
	isAdmin,
	isModer
}
