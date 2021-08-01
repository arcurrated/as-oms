module.exports = (mongoose, mongoosePaginate) => {
	const OperationSchema = require('./schemes/operation.schema.js')(mongoose)
	OperationSchema.set('_id', true)
	OperationSchema.set('timestamps', true)
	OperationSchema.plugin(mongoosePaginate)
	const OperationModel = mongoose.model('operation', OperationSchema)
	return OperationModel
}