module.exports = (mongoose) => {
	const CommonsModel = mongoose.model('commons', mongoose.Schema({
		currentOrderNumber: Number,
		organizationTitle: String,
		organizationAddress: String,
		orderAgreementText: String,
	},  { timestamps: true }))
	return CommonsModel
}