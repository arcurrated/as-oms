exports.verifyAndPreprocess = (req, res, next) => {
	if(!req.body.parts && !req.body.operations){
		res.status(400).send({message: "Content cannot be empty"})
		return
	}
	//validate some fields
	req.body.totalPrice = 0
	req.body.totalPartsPrice = 0
	req.body.totalOperationsPrice = 0
	for(let index in req.body.operations){
		let operation = req.body.operations[index]
		let opPrice = operation.count * operation.price
		req.body.operations[index].totalPrice = opPrice
		req.body.totalPrice += opPrice
		req.body.totalOperationsPrice += opPrice
	}
	for(let index in req.body.parts){
		let part = req.body.parts[index]
		let partsPrice = part.count * part.price
		req.body.parts[index].totalPrice = partsPrice
		req.body.totalPrice += partsPrice
		req.body.totalPartsPrice += partsPrice
	}
	//console.log(req)
	next()
}
