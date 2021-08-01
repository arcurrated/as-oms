const config = require('../config/auth.config.js')
const db = require('../models')
const User = db.users

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.findAll = (req, res) => {
	User.find({}, {username: 1, role: 1}).then(data => {
		res.send(data)
	}).catch(err => {
		res.status(500).send({ message: err.message || "Server error" })
	})
}

exports.deleteOne = (req, res) => {
	const { username } = req.params
	User.findOneAndDelete({ username }).then(data => {
		if(!data){
			res.status(404).send({ message: "Not found" })
		} else {
			res.send({ message: "OK" })
		}
	}).catch(err => {
		res.status(500).send({ message: "Server error" })
	})
}

exports.signUp = (req, res) => {
	if(!RegExp(/^[a-zA-Z0-9]+$/).test(req.body.username)){
		res.status(400).send({ message: "Not valid username" })
		return
	}
	const user = new User({
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password, 8), 
		role: 0,
	})

	user.save(user).then(data => {
		res.send({ message: "User has been registered successfully" })
	}).catch(err => {
		res.status(500).send({ message: err.message || "Server error" })
	})
}

exports.signIn = (req, res) => {
	User.findOne({ username: req.body.username }).then(data => {
		if(!data || !bcrypt.compareSync(req.body.password, data.password)){
			return res.status(401).send({ message: "Username or password not valid" })
		}

		let token = jwt.sign({ id: data._id}, config.secret, { expiresIn: 3600*24*7 })

		let role = 'user'
		switch(data.role){
			case 1: role = 'moder'; break;
			case 2: role = 'admin'; break;
		}

		res.send({
			username: data.username,
			role: role,
			accessToken: token
		})
	})
}

exports.setRole = (req, res) => {
	const { role, username } = req.body

	User.findOneAndUpdate({ username }, { $set: { role } }, {useFindAndModify: false}).then(data => {
		if(!data){
			res.status(404).send({ message: "Not found" })
		} else {
			res.send({ message: "OK" })
		}
	}).catch(err => {
		res.status(500).send({ message: err.message || 'Server error' })
	})
}

exports.setPassword = (req, res) => {
	const { password, lastPassword, username } = req.body

	if(req.userRole < 2 && username != req.userUsername){
		return res.status(403).send({ message: "U cannot do it" })
	}
	User.findOne({ username }).then(data => {
		if(!data){
			res.status(404).send({ message: "User not found" })
		} else {
			const user = data
			if(req.userRole < 2 && !bcrypt.compareSync(lastPassword, user.password)){
				res.status(401).send({message: "Password is not valid"})
			} else {
				User.findByIdAndUpdate(user._id, { $set: { password: bcrypt.hashSync(password, 8) } }, { useFindAndModify: false }).then(data => {
					res.send({ message: "OK" })
				}).catch(err => {
					res.status(500).send({ message: err.message || 'Server error' })
				})
			}
		}
	}).catch(err => {
		res.status(500).send({ message: err.message || 'Server error' })
	})
}
