module.exports = (mongoose, mongoosePaginate) => {
	const PayerSchema = require('./schemes/payer.schema.js')(mongoose)
	PayerSchema.set('_id', true)
	PayerSchema.set('timestamps', true)
	PayerSchema.plugin(mongoosePaginate)
	const PayerModel = mongoose.model('payer', PayerSchema)
	return PayerModel
}