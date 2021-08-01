module.exports = mongoose => {
	const User = mongoose.model('user', new mongoose.Schema({
		username: String,
		password: String,
		role: Number //1 - moder, 2 - admin
	}))
	return User
}