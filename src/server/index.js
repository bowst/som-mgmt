/* eslint-disable no-tabs */
const express = require('express');
const os = require('os');

const app = express();
const path = require('path');

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

app.get('/api/getProduct', async (req, res) => {
	console.log('req', req);
	try {
		const product = await shopify.getProduct(null);
		res.send({ product });
	} catch (error) {
		throw Error(error);
	}
});

app.get('/api/listProductImages', async (req, res) => {
	try {
		const images = await shopify.listProductImages();
		res.send({ images });
	} catch (error) {
		throw Error(error);
	}
});

const root_path = path.join(__dirname, '../../public/index.html');
console.log('root_path', root_path);
app.get('/*', (req, res) => res.sendFile(root_path));
// app.get('/', (req, res) => res.send({}));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
