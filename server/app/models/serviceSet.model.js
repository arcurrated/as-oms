module.exports = (mongoose, mongoosePaginate) => {
	const ServiceSetSchema = require('./schemes/serviceSet.schema.js')(mongoose)
	ServiceSetSchema.plugin(mongoosePaginate)
	const ServiceSet = mongoose.model('serviceSet', ServiceSetSchema)
	return ServiceSet
}