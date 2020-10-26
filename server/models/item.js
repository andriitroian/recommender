const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
	title: String,
	description: String,
	picture: String,
	keywords: String,
	price: String
});

const Item = module.exports = mongoose.model('Item', ItemSchema);
