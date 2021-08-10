const db = require('../models')
const Part = db.parts
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

	Part.paginate(query, { offset, limit, sort }).then(data => {
		res.send({
			totalPages: data.totalPages,
			totalItems: data.totalDocs,
			currentPage: data.page,
			parts: data.docs,
			perPage: limit,
		})
	}).catch(err => {
		res.status(500).send({ message: err.message || "Server error" })
	})
}

exports.findOne = (req, res) => {
	const id = req.params.id

	Part.findById(id).then(data => {
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

	Part.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
		if(!data){
			res.status(404).send({ message: "Not found" })
			return
		}
		Part.findById(id).then(res.send).catch(err => {
			res.status(500).send({ message: err.message || "Server error" })
		})
	}).catch(err => {
		res.status(500).send({ message: err.message || "Server error" })
	})
}

exports.deleteOne = (req, res) => {
	const id = req.params.id

	Part.findByIdAndDelete(id).then(data => {
		if(!data){
			res.status(404).send({ message: "Not found" })
		} else {
			res.send({ message: "Successfully deleted" })
		}
	}).catch(err => {
		res.status(500).send({ message: err.message || "Server error" })
	})
}

exports.autofill = (req, res) => {
	const { page, perPage } = req.query
	const { offset, limit } = getPagination(page, perPage)

	const select = req.body.field
	const value = req.body.value

	if(!select || !value){
		res.status(400).send({ message: "Empty fields" })
		return
	}

	let query = {}
	query[select] = new RegExp(value, 'i')

	Part.paginate(query, { select, offset, limit }).then(data => {
		res.send({
			totalItems: data.totalDocs,
			currentPage: data.page,
			totalPages: data.totalPages,
			entries: data.docs,
		})
	}).catch(err => {
		res.status(500).send({ message: err.message || "Server error" })
	})
}