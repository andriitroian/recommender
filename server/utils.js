const jwt = require('jsonwebtoken');

const tokenSecretKey = 'troian_coursework_recommender';

const getCosineDistance = (v1, v2) => {
	const numberOfIterations = Math.min(v1.length, v2.length);
	let multiplying = 0;
	for (let i = 0; i < numberOfIterations; ++i) {
		multiplying += v1[i] * v2[i];
	}
	const vCos = multiplying / (getMagnitude(v1) * getMagnitude(v2));
	return isNaN(vCos) ? 0 : Math.round(vCos * 100) / 100;
};

const getMagnitude = (vector) => {
	return Math.sqrt(vector.reduce((acc, next) => acc += next * next, 0));
};

const getJaccardDistance = (v1, v2) => {
	return intersection(v1, v2).length / union(v1, v2).length;
};

const union = (v1, v2) => {
	return Array.from(new Set([...v1, ...v2]));
};

const intersection = (v1, v2) => {
	return v1.filter(x => v2.includes(x));
};

const normilizeRatings = (v) => {
	const numValues = v.filter(val => typeof val === 'number');
	const sum = numValues.reduce((acc, next) => acc += next, 0);
	const avg = sum / numValues.length;
	return v.map(val => {
		if (typeof val === 'number') {
			if (numValues.every(vv => vv === numValues[0])) {
				return Math.round((val + 1 - avg) * 100) / 100;
			}
			return Math.round((val - avg) * 100) / 100;
		} else { return 0; }
	});
};

const getToken = (user) => {
	const payload = { subject: user._id };
	return jwt.sign(payload, tokenSecretKey);
};

const decryptToken = (token) => jwt.verify(token, tokenSecretKey);

module.exports = {
	getCosineDistance,
	getJaccardDistance,
	getToken,
	decryptToken,
	normilizeRatings,
	getMagnitude,
	intersection
};
