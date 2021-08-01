const db = require('../models')
const Vehicle = db.vehicles
const DEFAULT_PER_PAGE = process.env.DEFAULT_PER_PAGE || 5

const getPagination = (page, size) => {
	const limit = size ? +size : DEFAULT_PER_PAGE
	const offset = page ? (page-1) * limit : 0

	return {offset, limit}
}

const buildQuery = filter => {
	let query = {}

	if(filter){
		if(filter.STSNumber) { query['STSNumber'] = new RegExp(filter.STSNumber, 'i') }
		if(filter.licensePlateNumber){ query['licensePlateNumber'] = new RegExp(filter.licensePlateNumber, 'i')}
		if(filter.VIN){ query['VIN'] = new RegExp(filter.VIN, 'i')}
		if(filter.brand){ query['brand'] = new RegExp(filter.brand, 'i')}
		if(filter.model){ query['model'] = new RegExp(filter.model, 'i')}
		if(filter.releaseYear){ query['releaseYear'] = filter.releaseYear}
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

	Vehicle.paginate(query, { offset, limit, sort }).then(data => {
		res.send({
			totalItems: data.totalDocs,
			vehicles: data.docs,
			totalPages: data.totalPages,
			currentPage: data.page
		})
	}).catch(err => {
		res.status(500).send({ message: err.message || "Error while extracting vehicles" })
	})
}

exports.findOne = (req, res) => {
	const id = req.params.id

	Vehicle.findById(id).then(data => {
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

	Vehicle.findByIdAndUpdate(id, req.body, { useFindAndModify: false}).then(data => {
		if(!data){
			res.status(404).send({ message: "Not found" })
			return
		}
		Vehicle.findById(id).then(data => {
			res.send(data)
		}).catch(err => { res.status(500).send({ message: err.message || "Server error" })})
	}).catch(err => {
		res.status(500).send({ message: err.message || "Server error" })
	})
}

exports.deleteOne = (req, res) => {
	const id = req.params.id

	Vehicle.findByIdAndDelete(id).then(data => {
		if(!data){
			res.status(404).send({ message: "Not found" })
		} else {
			res.send({ message: "Successfully deleted" })
		}
	}).catch(err => {
		res.status(500).send({ message: err.message || 'Server error'})
	})
}