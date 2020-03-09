/* eslint-disable no-tabs */
const express = require('express');
const os = require('os');

const app = express();

const shopify = require('./shopify');

app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.get('/api/listProducts', async (req, res) => {
	try {
		const products = await shopify.listProducts();
		res.send({ products });
	} catch (error) {
		throw Error(error);
	}
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../../public/index.html')));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
