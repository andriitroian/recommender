const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const RatingSchema = new mongoose.Schema({
	user: {type: ObjectId, ref: 'User'},
	item: {type: ObjectId, ref: 'Item'},
	rating: Number
});

const Rating = module.exports = mongoose.model('Rating', RatingSchema);
