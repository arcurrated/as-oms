module.exports = (mongoose, mongoosePaginate) => {
	const PartSchema = require('./schemes/part.schema.js')(mongoose)
	PartSchema.set('_id', true)
	PartSchema.set('timestamps', true)
	PartSchema.plugin(mongoosePaginate)
	const PartModel = mongoose.model('part', PartSchema)
	return PartModel
}