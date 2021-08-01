module.exports = (mongoose, mongoosePaginate) => {
	const ClientSchema = require('./schemes/client.schema.js')(mongoose)
	ClientSchema.set('_id', true)
	ClientSchema.set('timestamps', true)
	ClientSchema.plugin(mongoosePaginate)
	const ClientModel = mongoose.model('client', ClientSchema)
	return ClientModel
}