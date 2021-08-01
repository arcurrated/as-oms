module.exports = mongoose => {
	const VehicleSchema = mongoose.Schema({
		STSNumber: String,
		licensePlateNumber: String,
		brand: String,
		model: String,
		VIN: String,
		releaseYear: Number,
		color: String,
		engine: String,
		engineVolume: Number,
		enginePower: String,
		ownerFIO: String,
		ownerRepublic: String,
		ownerDistrict: String,
		ownerCity: String,
		ownerStreet: String,
		ownerHouse: String,
		ownerAppartment: String,
		STSReleaseDepartment: String,
		STSReleaseDate: Date,
	}, {_id: false})


	VehicleSchema.method('toJSON', function(){
		const {__v, _id, ...object} = this.toObject();
		object.id = _id;
		return object;
	})

	return VehicleSchema
}