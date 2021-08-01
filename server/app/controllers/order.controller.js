const db = require('../models')
const Order = db.orders
const Vehicle = db.vehicles
const Client = db.clients
const Payer = db.payers
const Operation = db.operations
const Part = db.parts
const Common = db.commons
const DEFAULT_PER_PAGE = process.env.DEFAULT_PER_PAGE || 5

const getPagination = (page, size) => {
	const limit = size ? +size : DEFAULT_PER_PAGE
	const offset = page ? (page-1) * limit : 0

	return {offset, limit}
}

const buildQuery = filter => {
	let query = {}

	if(filter){
		if(filter.number){ query.number = filter.number }
		if(filter.status){ query.status = filter.status }

		if(filter.dateFrom || filter.dateTo){ query.createdAt = {}}
		if(filter.dateFrom){ query.createdAt.$gte = new Date(filter.dateFrom) }
		if(filter.dateTo){ query.createdAt.$lte = new Date(filter.dateTo) }

		if(filter.vehicle){
			if(filter.vehicle.licensePlateNumber){ query['vehicle.licensePlateNumber'] = new RegExp(filter.vehicle.licensePlateNumber, 'i')}
			if(filter.vehicle.VIN){ query['vehicle.VIN'] = new RegExp(filter.vehicle.VIN, 'i')}
			if(filter.vehicle.brand){ query['vehicle.brand'] = new RegExp(filter.vehicle.brand, 'i')}
			if(filter.vehicle.model){ query['vehicle.model'] = new RegExp(filter.vehicle.model, 'i')}
			if(filter.vehicle.releaseYear){ query['vehicle.releaseYear'] = filter.vehicle.releaseYear}
		}
		if(filter.client){
			if(filter.client.firstName){ query["client.firstName"] = new RegExp(filter.client.firstName, 'i')}
			if(filter.client.lastName){ query['client.lastName'] = new RegExp(filter.client.lastName, 'i')}
			if(filter.client.middleName){ query['client.middleName'] = new RegExp(filter.client.middleName, 'i')}
			if(filter.client.sex){ query['client.sex'] = filter.client.sex}
			if(filter.client.phoneNumber){ query['client.phoneNumber'] = new RegExp(filter.client.phoneNumber, 'i')}
			if(filter.client.email){ query['client.email'] = new RegExp(filter.client.email, 'i')}
		}
		if(filter.payer){
			if(filter.payer.title){ query['payer.title'] = new RegExp(filter.payer.title, 'i')}
			if(filter.payer.phoneNumber){ query['payer.phoneNumber'] = new RegExp(filter.payer.phoneNumber, 'i')}
		}
	}
	//console.log(query)
	return query
}

exports.create = (req, res) => {
	const order = new Order(req.body)

	Common.findOneAndUpdate({}, {$inc: {currentOrderNumber: 1} }, { useFindAndModify: false }).then((data) => {
		order.number = data.currentOrderNumber
		order.save(order).then(data => {
			res.send(data)
		}).catch(err => {
			console.log(err)
			res.status(500).send({message: err.message || "Some error occurred while adding order"})
		})
	}).catch(err => {
		console.log(err)
		res.status(500).send({ message: "Server error" })
	})

	// добавление элементов для автозаполнения
	Vehicle.findOne(req.body.vehicle).then(data => {
		if(!data){
			const vehicle = new Vehicle(req.body.vehicle)
			vehicle.save(vehicle).catch(console.log)
		}
	})
	Client.findOne(req.body.client).then(data => {
		if(!data){
			const client = new Client(req.body.client)
			client.save(client).catch(console.log)
		}
	})
	Payer.findOne(req.body.payer).then(data => {
		if(!data){
			const payer = new Payer(req.body.payer)
			payer.save(payer).catch(console.log)
		}
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

	Order.paginate(query, {offset, limit, sort}).then(data => {
		res.send({
			totalItems: data.totalDocs,
			orders: data.docs,
			totalPages: data.totalPages,
			currentPage: data.page,
		})
	}).catch(err => {
		res.status(500).send({message: "Server error"})
	})
}

exports.findOne = (req, res) => {
	const id = req.params.id

	Order.findById(id).then(data => {
		if(!data){
			res.status(404).send({message: "Not found"})
		} else {
			res.send(data)
		}
	}).catch(err => {
		res.status(500).send({message: "Some error occurred"});
	})
}

exports.update = (req, res) => {
	const id = req.params.id

	Order.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(data => {
		if(!data){
			res.status(404).send({message: 'Not found'})
			return
		}
		Order.findById(id).then(data => {
			res.send(data)
		}).catch(err => {res.status(500).send({message: "Server error"})})
	}).catch(err => {
		res.status(500).send({message: 'Server error'})
	})

	//проверка и загрузка пресетов для автозаполнения
	for(let index in req.body.operations){
		let operation = req.body.operations[index]
		Operation.findOne({title: operation.title}).then(data => {
			if(!data){
				const op = new Operation(operation)
				op.save(op).catch(console.log)
			}
		})
	}
	for(let index in req.body.parts){
		let part = req.body.parts[index]
		Part.findOne({title: part.title}).then(data => {
			if(!data){
				const _part = new Part(part)
				_part.save(_part).catch(console.log)
			}
		})
	}
}

exports.deleteOne = (req, res) => {
	const id = req.params.id

	Order.findByIdAndDelete(id).then(data => {
		if(!data){
			res.status(404).send({message: "Not found"})
		} else {
			res.send({message: "Order was deleted successfully"})
		}
	}).catch(err => {
		res.status(500).send({message: "Server error"})
	})
}
