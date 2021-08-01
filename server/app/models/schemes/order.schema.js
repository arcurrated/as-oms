module.exports = mongoose => {
	const OrderSchema = mongoose.Schema({
		vehicle: require('./vehicle.schema.js')(mongoose),
		client: require('./client.schema.js')(mongoose),
		payer: require('./payer.schema.js')(mongoose),
		number: Number,
		reason: String,
		notes: String,
		recomendations: String,
		mileageInit: Number,
		mileageDone: Number,
		operations: [require('./operation.schema.js')(mongoose)],
		parts: [require('./part.schema.js')(mongoose)],
		lastOpenedAt: Date,
		totalPrice: Number, // обновляется при каждом обновлении в api
		totalOperationsPrice: Number,
		totalPartsPrice: Number,
		status: Number // 0-запланирован, 1-открыт, 2-в работе, 3-ожидает запчасти, 4-выполнен, 5-оплачен
	}, {timestamps: true})

	OrderSchema.method('toJSON', function(){
		const {__v, _id, ...object} = this.toObject();
		object.id = _id;
		return object;
	})

	return OrderSchema
}
