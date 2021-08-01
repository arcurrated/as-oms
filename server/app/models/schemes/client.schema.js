module.exports = mongoose => {
	const ClientSchema = mongoose.Schema({
		phoneNumber: String,
		firstName: String,
		lastName: String,
		middleName: String,
		bdate: Date,
		sex: Number,
		email: String,
	}, {_id: false})

	ClientSchema.method('toJSON', function(){
		const {__v, _id, ...object} = this.toObject();
		object.id = _id;
		return object;
	})

	return ClientSchema
}