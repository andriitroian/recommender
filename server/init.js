const mongoose = require('mongoose');

const Item = require('./models/item');
const Rating = require('./models/rating');
const User = require('./models/user');

let users;

mongoose.connect('mongodb://localhost:27017/recommender', {useNewUrlParser: true})
	.then(() => mongoose.connection.db.dropDatabase())
	.then(() => {
		return Promise.all([
			User.create({name: 'Uzma Hawes', login: 'uzma', password: 'qwerty'}),
			User.create({name: 'Jorja Hensley', login: 'jorja', password: 'qwerty'}),
			User.create({name: 'Zaki Harper', login: 'zaki', password: 'qwerty'}),
			User.create({name: 'Eleni Oakley', login: 'eleni', password: 'qwerty'}),
			User.create({name: 'Barry Merrill', login: 'barry', password: 'qwerty'}),
			User.create({name: 'Jordanna Mcpherson', login: 'jordanna', password: 'qwerty'}),
			User.create({name: 'Miyah Harding', login: 'miyah', password: 'qwerty'}),
			User.create({name: 'Mariana Koch', login: 'mariana', password: 'qwerty'}),
			User.create({name: 'Keisha Hirst', login: 'keisha', password: 'qwerty'}),
			User.create({name: 'Nylah Muir', login: 'nylah', password: 'qwerty'}),
			User.create({name: 'Andrii Troian', login: 'andrii', password: 'qwerty'}),
		]);
	})
	.then(u => {
		users = u;
		return Promise.all([
			Item.create({
				title: 'Porsche Cayenne',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in bibendum sapien, non iaculis neque. Sed fermentum efficitur nunc in rhoncus. Etiam pretium urna sodales lorem pellentesque tempus. Curabitur sollicitudin urna a justo dapibus, vitae varius diam scelerisque. Nunc eu ipsum eget dolor dignissim efficitur vitae quis felis. Nullam interdum ipsum lorem, ut accumsan metus tincidunt at. Proin vitae volutpat eros. Ut id ante dui. Etiam at facilisis libero. Duis mi erat, elementum scelerisque turpis sit amet, varius vulputate eros. Mauris tincidunt augue ornare pulvinar luctus. Vivamus finibus, risus lobortis finibus sodales, nisi lorem vulputate nisi, id sagittis diam dolor ut diam. Duis sit amet sagittis diam, ac euismod metus.',
				picture: 'https://i.pinimg.com/originals/bb/64/0a/bb640a30c66a853a859c21b6325dd864.jpg',
				keywords: 'porsche 4wd crossover offroad car red new automatic transmission 3000cm3 4 seats',
				price: '$70000'
			}),
			Item.create({
				title: 'Porsche 911',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in bibendum sapien, non iaculis neque. Sed fermentum efficitur nunc in rhoncus. Etiam pretium urna sodales lorem pellentesque tempus. Curabitur sollicitudin urna a justo dapibus, vitae varius diam scelerisque. Nunc eu ipsum eget dolor dignissim efficitur vitae quis felis. Nullam interdum ipsum lorem, ut accumsan metus tincidunt at. Proin vitae volutpat eros. Ut id ante dui. Etiam at facilisis libero. Duis mi erat, elementum scelerisque turpis sit amet, varius vulputate eros. Mauris tincidunt augue ornare pulvinar luctus. Vivamus finibus, risus lobortis finibus sodales, nisi lorem vulputate nisi, id sagittis diam dolor ut diam. Duis sit amet sagittis diam, ac euismod metus.',
				picture: 'https://cdn.motor1.com/images/mgl/OBB0X/s1/porsche-911-turbo-yellow-saffron-metallic-paint.jpg',
				keywords: 'porsche car used manual transmission yellow coupe 2wd 2000cm3 2 seats',
				price: '$65000'
			}),
			Item.create({
				title: 'BMW X3',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in bibendum sapien, non iaculis neque. Sed fermentum efficitur nunc in rhoncus. Etiam pretium urna sodales lorem pellentesque tempus. Curabitur sollicitudin urna a justo dapibus, vitae varius diam scelerisque. Nunc eu ipsum eget dolor dignissim efficitur vitae quis felis. Nullam interdum ipsum lorem, ut accumsan metus tincidunt at. Proin vitae volutpat eros. Ut id ante dui. Etiam at facilisis libero. Duis mi erat, elementum scelerisque turpis sit amet, varius vulputate eros. Mauris tincidunt augue ornare pulvinar luctus. Vivamus finibus, risus lobortis finibus sodales, nisi lorem vulputate nisi, id sagittis diam dolor ut diam. Duis sit amet sagittis diam, ac euismod metus.',
				picture: 'https://media.whatcar.com/450x299/wc-image/bmw-x340i-aa.jpg',
				keywords: 'bmw crossover 2wd black used automatic transmission 2500cm3 4 seats',
				price: '$48000'
			}),
			Item.create({
				title: 'Lada Niva',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in bibendum sapien, non iaculis neque. Sed fermentum efficitur nunc in rhoncus. Etiam pretium urna sodales lorem pellentesque tempus. Curabitur sollicitudin urna a justo dapibus, vitae varius diam scelerisque. Nunc eu ipsum eget dolor dignissim efficitur vitae quis felis. Nullam interdum ipsum lorem, ut accumsan metus tincidunt at. Proin vitae volutpat eros. Ut id ante dui. Etiam at facilisis libero. Duis mi erat, elementum scelerisque turpis sit amet, varius vulputate eros. Mauris tincidunt augue ornare pulvinar luctus. Vivamus finibus, risus lobortis finibus sodales, nisi lorem vulputate nisi, id sagittis diam dolor ut diam. Duis sit amet sagittis diam, ac euismod metus.',
				picture: 'https://i.pinimg.com/originals/01/67/32/016732a6f7c06538e0ca2d7578974ff3.jpg',
				keywords: 'lada 4wd crossover offroad car red new manual transmission 2000cm3 4 seats',
				price: '$1000'
			}),
			Item.create({
				title: 'BMW F750GS',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in bibendum sapien, non iaculis neque. Sed fermentum efficitur nunc in rhoncus. Etiam pretium urna sodales lorem pellentesque tempus. Curabitur sollicitudin urna a justo dapibus, vitae varius diam scelerisque. Nunc eu ipsum eget dolor dignissim efficitur vitae quis felis. Nullam interdum ipsum lorem, ut accumsan metus tincidunt at. Proin vitae volutpat eros. Ut id ante dui. Etiam at facilisis libero. Duis mi erat, elementum scelerisque turpis sit amet, varius vulputate eros. Mauris tincidunt augue ornare pulvinar luctus. Vivamus finibus, risus lobortis finibus sodales, nisi lorem vulputate nisi, id sagittis diam dolor ut diam. Duis sit amet sagittis diam, ac euismod metus.',
				picture: 'https://i.ytimg.com/vi/IKmKYHjrPYY/maxresdefault.jpg',
				keywords: 'bmw motorcycle yellow 1500cm3 2 seats',
				price: '$20000'
			}),
			Item.create({
				title: 'Dnepr MT-10',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in bibendum sapien, non iaculis neque. Sed fermentum efficitur nunc in rhoncus. Etiam pretium urna sodales lorem pellentesque tempus. Curabitur sollicitudin urna a justo dapibus, vitae varius diam scelerisque. Nunc eu ipsum eget dolor dignissim efficitur vitae quis felis. Nullam interdum ipsum lorem, ut accumsan metus tincidunt at. Proin vitae volutpat eros. Ut id ante dui. Etiam at facilisis libero. Duis mi erat, elementum scelerisque turpis sit amet, varius vulputate eros. Mauris tincidunt augue ornare pulvinar luctus. Vivamus finibus, risus lobortis finibus sodales, nisi lorem vulputate nisi, id sagittis diam dolor ut diam. Duis sit amet sagittis diam, ac euismod metus.',
				picture: 'https://i.ytimg.com/vi/r7OzZmHmB9w/hqdefault.jpg',
				keywords: 'dnepr motorcycle black 800cm3 2 seats',
				price: '$500'
			}),
			Item.create({
				title: 'Porsche bicycle',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in bibendum sapien, non iaculis neque. Sed fermentum efficitur nunc in rhoncus. Etiam pretium urna sodales lorem pellentesque tempus. Curabitur sollicitudin urna a justo dapibus, vitae varius diam scelerisque. Nunc eu ipsum eget dolor dignissim efficitur vitae quis felis. Nullam interdum ipsum lorem, ut accumsan metus tincidunt at. Proin vitae volutpat eros. Ut id ante dui. Etiam at facilisis libero. Duis mi erat, elementum scelerisque turpis sit amet, varius vulputate eros. Mauris tincidunt augue ornare pulvinar luctus. Vivamus finibus, risus lobortis finibus sodales, nisi lorem vulputate nisi, id sagittis diam dolor ut diam. Duis sit amet sagittis diam, ac euismod metus.',
				picture: 'https://cdn.road.cc/sites/default/files/cropped/preview_500/images/Porsche%20Bikes%202012/Porsche%20Bikes%202012%206.jpg',
				keywords: 'porsche bicycle 26" white',
				price: '$2000'
			}),
			Item.create({
				title: 'Fairline Targa 43',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in bibendum sapien, non iaculis neque. Sed fermentum efficitur nunc in rhoncus. Etiam pretium urna sodales lorem pellentesque tempus. Curabitur sollicitudin urna a justo dapibus, vitae varius diam scelerisque. Nunc eu ipsum eget dolor dignissim efficitur vitae quis felis. Nullam interdum ipsum lorem, ut accumsan metus tincidunt at. Proin vitae volutpat eros. Ut id ante dui. Etiam at facilisis libero. Duis mi erat, elementum scelerisque turpis sit amet, varius vulputate eros. Mauris tincidunt augue ornare pulvinar luctus. Vivamus finibus, risus lobortis finibus sodales, nisi lorem vulputate nisi, id sagittis diam dolor ut diam. Duis sit amet sagittis diam, ac euismod metus.',
				picture: 'https://d196r9c7cfkkpm.cloudfront.net/fotos/xlarge/360638-ff3e5e2001aa385b0f24d877a5a20d76-com.jpg',
				keywords: 'fairline boat white 300hp 15m',
				price: '$37000'
			}),
			Item.create({
				title: 'Nimbus 305',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in bibendum sapien, non iaculis neque. Sed fermentum efficitur nunc in rhoncus. Etiam pretium urna sodales lorem pellentesque tempus. Curabitur sollicitudin urna a justo dapibus, vitae varius diam scelerisque. Nunc eu ipsum eget dolor dignissim efficitur vitae quis felis. Nullam interdum ipsum lorem, ut accumsan metus tincidunt at. Proin vitae volutpat eros. Ut id ante dui. Etiam at facilisis libero. Duis mi erat, elementum scelerisque turpis sit amet, varius vulputate eros. Mauris tincidunt augue ornare pulvinar luctus. Vivamus finibus, risus lobortis finibus sodales, nisi lorem vulputate nisi, id sagittis diam dolor ut diam. Duis sit amet sagittis diam, ac euismod metus.',
				picture: 'https://newimages.yachtworld.com/resize/1/78/32/5637832_20161025010754554_1_XLARGE.jpg?f=/1/78/32/5637832_20161025010754554_1_XLARGE.jpg&w=924&h=693&t=1509019733000',
				keywords: 'nimbus boat white 220hp 15m',
				price: '$40000'
			}),
			Item.create({
				title: 'Galia 600',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in bibendum sapien, non iaculis neque. Sed fermentum efficitur nunc in rhoncus. Etiam pretium urna sodales lorem pellentesque tempus. Curabitur sollicitudin urna a justo dapibus, vitae varius diam scelerisque. Nunc eu ipsum eget dolor dignissim efficitur vitae quis felis. Nullam interdum ipsum lorem, ut accumsan metus tincidunt at. Proin vitae volutpat eros. Ut id ante dui. Etiam at facilisis libero. Duis mi erat, elementum scelerisque turpis sit amet, varius vulputate eros. Mauris tincidunt augue ornare pulvinar luctus. Vivamus finibus, risus lobortis finibus sodales, nisi lorem vulputate nisi, id sagittis diam dolor ut diam. Duis sit amet sagittis diam, ac euismod metus.',
				picture: 'https://cdn.riastatic.com/photosnewr/auto/newauto_photos/galia-600__794071-620x415x70.jpg',
				keywords: 'galia boat white 220hp 7m',
				price: '$26000'
			}),
		]);
	})
	.then(items => {
		/*
		* Users
		* 0 - Uzma Hawes
		* 1 - Jorja Hensley
		* 2 - Zaki Harper
		* 3 - Eleni Oakley
		* 4 - Barry Merrill
		* 5 - Jordanna Mcpherson
		* 6 - Miyah Harding
		* 7 - Mariana Koch
		* 8 - Keisha Hirst
		* 9 - Nylah Muir
		* Items
		* 0 - Porsche Cayenne
		* 1 - Porsche 911
		* 2 - BMW X3
		* 3 - Lada Niva
		* 4 - BMW F750GS
		* 5 - Dnepr MT-10
		* 6 - Porsche bicycle
		* */
		return Promise.all([
			Rating.create({user: users[0]._id, item: items[0]._id, rating: 5}),
			Rating.create({user: users[0]._id, item: items[1]._id, rating: 4}),
			Rating.create({user: users[0]._id, item: items[6]._id, rating: 5}),
			
			Rating.create({user: users[1]._id, item: items[0]._id, rating: 2}),
			Rating.create({user: users[1]._id, item: items[3]._id, rating: 4}),
			Rating.create({user: users[1]._id, item: items[2]._id, rating: 2}),
			Rating.create({user: users[1]._id, item: items[4]._id, rating: 1}),
			Rating.create({user: users[1]._id, item: items[5]._id, rating: 5}),
			
			Rating.create({user: users[2]._id, item: items[0]._id, rating: 4}),
			Rating.create({user: users[2]._id, item: items[1]._id, rating: 5}),
			Rating.create({user: users[2]._id, item: items[2]._id, rating: 3}),
			Rating.create({user: users[2]._id, item: items[3]._id, rating: 1}),
			Rating.create({user: users[2]._id, item: items[4]._id, rating: 3}),
			Rating.create({user: users[2]._id, item: items[6]._id, rating: 4}),
			
			Rating.create({user: users[3]._id, item: items[4]._id, rating: 5}),
			Rating.create({user: users[3]._id, item: items[5]._id, rating: 1}),
			
			Rating.create({user: users[4]._id, item: items[2]._id, rating: 5}),
			Rating.create({user: users[4]._id, item: items[3]._id, rating: 1}),
			Rating.create({user: users[4]._id, item: items[4]._id, rating: 4}),
			Rating.create({user: users[4]._id, item: items[5]._id, rating: 1}),
			
			Rating.create({user: users[5]._id, item: items[3]._id, rating: 5}),
			Rating.create({user: users[5]._id, item: items[6]._id, rating: 1}),
			
			Rating.create({user: users[6]._id, item: items[0]._id, rating: 4}),
			Rating.create({user: users[6]._id, item: items[1]._id, rating: 3}),
			Rating.create({user: users[6]._id, item: items[2]._id, rating: 4}),
			Rating.create({user: users[6]._id, item: items[4]._id, rating: 5}),
			
			Rating.create({user: users[7]._id, item: items[1]._id, rating: 5}),
			Rating.create({user: users[7]._id, item: items[4]._id, rating: 4}),
			Rating.create({user: users[7]._id, item: items[5]._id, rating: 1}),
			
			Rating.create({user: users[8]._id, item: items[3]._id, rating: 5}),
			Rating.create({user: users[8]._id, item: items[5]._id, rating: 5}),
			
			Rating.create({user: users[9]._id, item: items[0]._id, rating: 5}),
			Rating.create({user: users[9]._id, item: items[2]._id, rating: 3}),
			Rating.create({user: users[9]._id, item: items[3]._id, rating: 1}),
		]);
	})
	.then(() => {
		console.log('fully set');
		mongoose.connection.close();
	})
	.catch(console.error);
