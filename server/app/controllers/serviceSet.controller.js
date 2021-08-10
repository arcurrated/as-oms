const db = require('../models')
const ServiceSet = db.serviceSets
const DEFAULT_PER_PAGE = process.env.DEFAULT_PER_PAGE || 5
const MAX_PER_PAGE = process.env.MAX_PER_PAGE || 50

const getPagination = (page, size) => {
	let limit = size ? +size : DEFAULT_PER_PAGE
	if(limit > MAX_PER_PAGE){
		limit = MAX_PER_PAGE
	}
	const offset = page ? (page-1) * limit : 0

	return {offset, limit}
}

const buildQuery = filter => {
	let query = {}

	if(filter){
		if(filter.title){ query.title = new RegExp(filter.title, 'i') }
	}

	return query
}

exports.create = (req, res) => {
	const serviceSet = new ServiceSet(req.body)

	serviceSet.save(serviceSet).then(data => {
		res.send(data)
	}).catch(err => {
		res.status(500).send({message: err.message || "Some error occurred while adding service set"})
	})
}

exports.findAll = (req, res) => {
	const { page, perPage, body } = req.query
	const { offset, limit } = getPagination(page,perPage)

	let filter = null
	let sort = { createdAt: -1 }
	if(body){
		const parsed_body = JSON.parse(body)
		if(parsed_body.filter) { filter = parsed_body.filter }
		if(parsed_body.sort) { sort = parsed_body.sort }
	}
	const query = buildQuery(filter)

	ServiceSet.paginate(query, { offset, limit, sort }).then(data => {
		res.send({
			totalPages: data.totalPages,
			totalItems: data.totalDocs,
			currentPage: data.page,
			serviceSets: data.docs,
			perPage: limit,
		})
	}).catch(err => {
		res.status(500).send({ message: err.message || "Server error" })
	})
}

exports.findOne = (req, res) => {
	const id = req.params.id

	ServiceSet.findById(id).then(data => {
		if(!data){
			res.status(404).send({ message: "Not found" })
		} else {
			res.send(data)
		}
	}).catch(err => {
		res.status(500).send({ message: err.message || "Server error" })
	})
}

exports.update = (req, res) => {
	const id = req.params.id
	ServiceSet.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
		if(!data){
			res.status(404).send({ message: "Not found" })
			return
		}
		ServiceSet.findById(id).then((data) =>{
			res.send(data)
		}).catch(err => {
			console.log(err)
			res.status(500).send({ message: err.message || "Server error" })
		})
	}).catch(err => {
		res.status(500).send({ message: err.message || "Server error" })
	})
}

exports.deleteOne = (req, res) => {
	const id = req.params.id

	ServiceSet.findByIdAndDelete(id).then(data => {
		if(!data){
			res.status(404).send({ message: "Not found" })
		} else {
			res.send({ message: "Successfully deleted" })
		}
	}).catch(err => {
		res.status(500).send({ message: err.message || "Server error" })
	})
}