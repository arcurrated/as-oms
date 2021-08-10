const dbConfig = require('../config/db.config.js')
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.orders = require('./order.model.js')(mongoose, mongoosePaginate)
db.vehicles = require('./vehicle.model.js')(mongoose, mongoosePaginate)
db.clients = require('./client.model.js')(mongoose, mongoosePaginate)
db.payers = require('./payer.model.js')(mongoose, mongoosePaginate)
db.operations = require('./operation.model.js')(mongoose, mongoosePaginate)
db.parts = require('./part.model.js')(mongoose, mongoosePaginate)
db.serviceSets = require('./serviceSet.model.js')(mongoose, mongoosePaginate)

db.commons = require('./commons.model.js')(mongoose)
db.users = require('./user.model.js')(mongoose)

module.exports = db