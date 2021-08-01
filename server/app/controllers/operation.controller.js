const db = require('../models')
const Operation = db.operations
const DEFAULT_PER_PAGE = process.env.DEFAULT_PER_PAGE || 5

const getPagination = (page, size) => {
	const limit = size ? +size : DEFAULT_PER_PAGE
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

	Operation.paginate(query, { offset, limit, sort }).then(data => {
		res.send({
			totalPages: data.totalPages,
			totalItems: data.totalDocs,
			operations: data.docs,
			currentPage: data.page
		})
	}).catch(err => {
		res.status(500).send({ message: err.message || "Server error" })
	})
}

exports.findOne = (req, res) => {
	const id = req.params.id

	Operation.findById(id).then(data => {
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

	Operation.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
		if(!data){
			res.status(404).send({ message: "Not found" })
			return
		}
		Operation.findById(id).then(res.send).catch(err => {
			res.status(500).send({ message: err.message || "Server error" })
		})
	}).catch(err => {
		res.status(500).send({ message: err.message || "Server error" })
	})
}

exports.deleteOne = (req, res) => {
	const id = req.params.id

	Operation.findByIdAndDelete(id).then(data => {
		if(!data){
			res.status(404).send({ message: "Not found" })
		} else {
			res.send({ message: "Successfully deleted" })
		}
	}).catch(err => {
		res.status(500).send({ message: err.message || "Server error" })
	})
}