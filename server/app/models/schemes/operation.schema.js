module.exports = mongoose => {
	const OperationSchema = mongoose.Schema({
		title: String,
		price: Number,
		count: Number,
		totalPrice: Number,
	}, {_id: false})

	OperationSchema.method('toJSON', function(){
		const {__v, _id, ...object} = this.toObject();
		object.id = _id;
		return object;
	})

	return OperationSchema
}