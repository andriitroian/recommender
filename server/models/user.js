const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: String,
	login: String,
	password: String
});

const User = module.exports = mongoose.model('User', UserSchema);
