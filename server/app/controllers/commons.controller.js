const db = require('../models')
const Common = db.commons


exports.findOne = (req, res) => {
	Common.findOne({}).then(data => {
		res.send(data)
	}).catch(err => {
		res.status(500).send({message: 'Server error'})
	})
}

exports.update = (req, res) => {
	Common.findOneAndUpdate({}, req.body, {useFindAndModify: false}).then(data => {
		if(!data){
			res.status(404).send({message: 'Not found'})
			return
		}
		Common.findOne({}).then(data => {
			res.send(data)
		}).catch(err => {res.status(500).send({message: "Server error"})})
	}).catch(err => {
		res.status(500).send({message: 'Server error'})
	})
}