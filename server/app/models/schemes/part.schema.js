module.exports = mongoose => {
	const PartSchema = mongoose.Schema({
		title: String,
		price: Number,
		count: Number,
		totalPrice: Number,
	}, {_id: false})

	PartSchema.method('toJSON', function(){
		const {__v, _id, ...object} = this.toObject();
		object.id = _id;
		return object;
	})

	return PartSchema
}