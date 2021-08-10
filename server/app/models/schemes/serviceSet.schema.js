module.exports = mongoose => {
	const ServiceSetSchema = mongoose.Schema({
		title: String,
		operations: [require('./operation.schema.js')(mongoose)],
		parts: [require('./part.schema.js')(mongoose)],
		totalOperationsPrice: Number,
		totalPartsPrice: Number,
		totalPrice: Number,
	}, {timestamps: true})

	ServiceSetSchema.method('toJSON', function(){
		const {__v, _id, ...object} = this.toObject();
		object.id = _id;
		return object;
	})

	return ServiceSetSchema
}
