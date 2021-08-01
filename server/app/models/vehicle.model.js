module.exports = (mongoose, mongoosePaginate) => {
	const VehicleSchema = require('./schemes/vehicle.schema.js')(mongoose)
	VehicleSchema.set('_id', true)
	VehicleSchema.set('timestamps', true)
	VehicleSchema.plugin(mongoosePaginate)
	const Vehicle = mongoose.model('vehicle', VehicleSchema)
	return Vehicle
}