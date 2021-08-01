const express = require('express')
const cors = require('cors')
require('dotenv').config()
const db = require('./app/models')

const commonDataDefault = new db.commons({
	currentOrderNumber: 1,
	organizationTitle: 'ООО "Пример"',
	organizationAddress: '',
	orderAgreementText: '',
})

const app = express()
db.mongoose.connect(db.url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => {
	console.log('mongo connected')

	db.commons.findOne({}).then(data => {
		if(!data){
			commonDataDefault.save().then(() => {
				console.log('created initial common data')
			}).catch(err => {
				console.log(err)
			})
		}
	}).catch(err => {
		console.log(err)
	})
}).catch(()=>{
	console.log('error in mongo connection')
	process.exit()
})

var corsOptions = {
	origin: process.env.CORS_ORIGIN || "http://10.0.0.169:8081"
};

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

require('./app/routes/auth.routes.js')(app)

require('./app/routes/order.routes.js')(app)
require('./app/routes/vehicle.routes.js')(app)
require('./app/routes/client.routes.js')(app)
require('./app/routes/payer.routes.js')(app)
require('./app/routes/operation.routes.js')(app)
require('./app/routes/part.routes.js')(app)
require('./app/routes/commons.routes.js')(app)

app.use((req, res) => {
	res.status(404).send({ message: "Route is not found" })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
	console.log('server running', PORT)
})
