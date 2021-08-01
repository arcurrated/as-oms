module.exports = mongoose => {
	const PayerSchema = mongoose.Schema({
		phoneNumber: String,
		title: String,
		INN: String,
		address: String,
	}, {_id: false})

	PayerSchema.method('toJSON', function(){
		const {__v, _id, ...object} = this.toObject();
		object.id = _id;
		return object;
	})

	return PayerSchema
}