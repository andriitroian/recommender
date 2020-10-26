const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const _ = require('underscore');
const app = express();
const port = 3000;
const SIMILARITY_TRESHOLD = 0.2;

const User = require('./models/user');
const Item = require('./models/item');
const Rating = require('./models/rating');

const {decryptToken, getToken, getJaccardDistance, normilizeRatings, getCosineDistance, intersection} = require('./utils');

mongoose.connect('mongodb://localhost:27017/recommender', {useNewUrlParser: true}, () => {
	console.log('DB connection is established');
});

app.use(cors());
app.use(bodyParser.json());

const verifyToken = (req, res, next) => {
	if (!req.headers.authorization) {
		res.status(401).send('Unauthorized request').end();
		return;
	}
	const token = req.headers.authorization.split(' ').pop();
	if (!token || token === 'null' || token === 'undefined') {
		res.status(401).send('Unauthorized request').end();
		return;
	}
	const payload = decryptToken(token);
	if (!payload) {
		res.status(401).send('Unauthorized request').end();
		return;
	}
	User.findOne({ _id: payload.subject })
		.then(u => {
			req.user = u;
			next();
		})
		.catch(e => {
			console.error(e);
			res.status(401).send('Unauthorized request').end();
		});
};

app.get('/', (req, res) => {
	res.send('I\'m just an API').end();
});

app.post('/login', (req, res) => {
	const data = req.body;
	if (!data.login || !data.password) {
		res.status(401).send({message: 'Invalid credentials'}).end();
		return;
	}
	User.findOne({login: data.login})
		.then(u => {
			console.log(u);
			if (!u) {
				res.status(404).send({message: 'User not found'}).end();
				return;
			}
			if (u.password === data.password) {
				res.status(200).send({token: getToken(u)}).end();
			} else {
				res.status(401).send({message: 'Invalid password'}).end();
			}
		})
		.catch(e => {
			console.error(e);
			res.status(500).send({message: 'Unknown error', error: e}).end();
		});
});

app.get('/items', verifyToken, (req, res) => {
	Item.find().sort('title')
		.then(items => {
			res.status(200).send(items).end();
		})
		.catch(e => {
			console.error(e);
			res.status(500).send({message: 'Unknown error', error: e}).end();
		});
});

app.post('/rating', verifyToken, (req, res) => {
	const itemId = req.body.itemId;
	const user = req.user;
	Rating.findOne({item: itemId, user: user._id})
		.then(r => {
			if (r) {
				res.status(200).send({value: r.rating}).end();
			} else {
				res.status(200).send({value: null}).end();
			}
		})
		.catch(e => {
			console.error(e);
			res.status(500).send({message: 'Unknown error', error: e}).end();
		});
});

app.post('/rate', verifyToken, (req, res) => {
	const data = req.body;
	const user = req.user;
	Rating.findOne({item: data.itemId, user: user._id})
		.then(r => {
			if (r) {
				r.rating = data.rating;
				return r.save();
			}
			return Rating.create({item: data.itemId, user: user._id, rating: data.rating});
		})
		.then(r => {
			res.status(200).send(r).end();
		})
		.catch(e => {
			console.error(e);
			res.status(500).send({message: 'Unknown error', error: e}).end();
		});
});

app.post('/item', verifyToken, (req, res) => {
	const itemId = req.body.itemId;
	Item.findOne({_id: itemId})
		.then(item => res.status(200).send(item).end())
		.catch(e => {
			console.error(e);
			res.status(500).send({message: 'Unknown error', error: e}).end();
		});
});

app.post('/content-based-recommendations', verifyToken, (req, res) => {
	const itemId = req.body.itemId;
	const user = req.user;
	let items;
	Item.find({_id: {$ne: itemId}})
		.then(i => {
			items = i;
			return Rating.find({user: user._id});
		})
		.then(ratings => {
			const ratedItems = ratings.map(r => r.item.toString());
			// TODO: comment out to include rated items
			items = items.filter(i => !ratedItems.includes(i._id.toString()));
			return Item.findOne({_id: itemId});
		})
		.then(item => {
			const recommendations = items
				.map(i => {
					return {
						similarity: getJaccardDistance(item.keywords.split(' '), i.keywords.split(' ')),
						item: i
					};
				})
				.filter(i => i.similarity > SIMILARITY_TRESHOLD);
			recommendations.sort((i1, i2) => i1.similarity < i2.similarity ? 1 : -1);
			res.status(200).send(recommendations).end();
		})
		.catch(e => {
			console.error(e);
			res.status(500).send({message: 'Unknown error', error: e}).end();
		});
});

app.get('/collaborative-filtering-recommendations', verifyToken, (req, res) => {
	const user = req.user;
	let users;
	let recommendations = [];
	
	let matrix = {};
	User.find()
		.then(u => {
			users = u;
			return Item.find();
		})
		.then(items => {
			users.forEach(u => {
				matrix[u._id.toString()] = {};
				items.forEach(i => {
					matrix[u._id.toString()][i._id.toString()] = null;
				});
			});
			return Rating.find({}, 'user item rating');
		})
		.then(ratings => {
			ratings.forEach(r => {
				matrix[r.user.toString()][r.item.toString()] = r.rating;
			});
			let usersSimilarity = {};
			const similarUsers = [];
			const currentUserVector = Object.values(matrix[user._id.toString()]);
			const currentUser = normilizeRatings(currentUserVector);
			const ratedItems = ratings
				.filter(r => r.user.toString() === user._id.toString())
				.map(r => r.item.toString());
			for (let u in matrix) {
				if (u && matrix.hasOwnProperty(u) && matrix[u]) {
					const initialUserVector = Object.values(matrix[u]);
					const userVector = normilizeRatings(initialUserVector);
					const similarity = getCosineDistance(currentUser, userVector);
					if (typeof similarity === 'number' &&
						!isNaN(similarity) &&
						u !== user._id.toString() &&
						similarity > SIMILARITY_TRESHOLD
					) {
						similarUsers.push(u);
						usersSimilarity[u] = similarity;
					}
				}
			}

			const recommendationRatings = ratings
				// TODO: uncomment to include rated items
				.filter(r => similarUsers.includes(r.user.toString()) && !ratedItems.includes(r.item.toString()))
				// .filter(r => similarUsers.includes(r.user.toString()))

				.map(i => ({item: i.item, similarity: usersSimilarity[i.user.toString()], rating: i.rating}));

			const recommendedItems = _.groupBy(recommendationRatings, 'item');
			for (let i in recommendedItems) {
				if (i && recommendedItems.hasOwnProperty(i) && recommendedItems[i]) {
					const sumOfRatings = recommendedItems[i].reduce((acc, next) => acc += (next.similarity * next.rating), 0);
					const sumOfSimilarities = recommendedItems[i].reduce((acc, next) => acc += next.similarity, 0);
					recommendations.push({
						item: i,
						rating: Math.round((sumOfRatings / sumOfSimilarities) * 100) / 100
					});
				}
			}
			return Item.find({_id: {$in: recommendations.map(r => r.item)}});
		})
		.then(items => {
			recommendations
				.forEach(r => {
					r.item = items.find(i => i._id.toString() === r.item);
				});
			recommendations.sort((r1, r2) => r1.rating < r2.rating ? 1 : -1);
			res.status(200).send(recommendations).end();
		})
		.catch(e => {
			console.error(e);
			res.status(500).send({message: 'Unknown error', error: e}).end();
		});
});

app.get('/rating-table', (req, res) => {
	let users;
	let matrix = {};
	let itemsRow = '<th></th>';
	let usersRow = '';
	User.find()
		.then(u => {
			users = u;
			return Item.find();
		})
		.then(items => {
			items.forEach(i => {
				itemsRow += '<th>' + i.title + '</th>';
			});
			users.forEach(u => {
				matrix[u._id.toString()] = {};
				items.forEach(i => {
					matrix[u._id.toString()][i._id.toString()] = ' ';
				});
			});
			return Rating.find({}, 'user item rating');
		})
		.then(ratings => {
			ratings.forEach(r => {
				matrix[r.user.toString()][r.item.toString()] = r.rating;
			});
			users.forEach(u => {
				const uId = u._id.toString();
				usersRow += `<tr><td><b>${u.name}</b></td>`;
				Object.values(matrix[uId]).forEach(val => {
					usersRow += `<td>${val}</td>`;
				});
			});
			res.send(`<style>td,th{text-align:center;border-bottom:1px solid black;border-right:1px solid black;}</style><table><tr>${itemsRow}</tr>${usersRow}</table>`).end();
		});
});

app.listen(port, () => {
	console.log('Server is ready');
});
