module.exports = (mongoose, mongoosePaginate) => {
	const OrderSchema = require('./schemes/order.schema.js')(mongoose)
	OrderSchema.plugin(mongoosePaginate)
	const Order = mongoose.model('order', OrderSchema)
	return Order
}