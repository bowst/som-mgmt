/* eslint-disable no-tabs */
const express = require('express');
const os = require('os');

const app = express();
const path = require('path');

const shopify = require('./shopify');

app.use(express.static('dist'));
app.use(express.json());

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
	try {
		const productId = req.query.productId;
		const product = await shopify.getProduct(productId);
		res.send({ product });
	} catch (error) {
		throw Error(error);
	}
});

app.get('/api/listProductImages', async (req, res) => {
	try {
		const productId = req.query.productId;
		const images = await shopify.listProductImages(productId);
		res.send({ images });
	} catch (error) {
		throw Error(error);
	}
});

// Metafields

app.get('/api/getProductVariantMetafields', async (req, res) => {
	try {
		const variantId = req.query.variantId;
		const metafields = await shopify.getProductVariantMetafields(variantId);
		res.send({ metafields });
	} catch (error) {
		throw Error(error);
	}
});

app.post('/api/createVariantMetafields', async (req, res) => {
	const metafields = await shopify.createProductMetafields(req.body).catch(e => {
		throw e;
	});
	res.send({ metafields });
});

app.post('/api/editMetafield', async (req, res) => {
	const metafields = await shopify.editMetafield(req.body).catch(e => {
		throw e;
	});
	res.send({ metafield });
});

app.get('/api/deleteMetafield', async (req, res) => {
	const id = req.query.id;
	const resp = await shopify.deleteMetafield(id).catch(e => {
		console.log('e: ', e);
		throw e;
	});
	res.send('Metafield deleted.');
});

const root_path = path.join(__dirname, '../../public/index.html');
// console.log('root_path', root_path);
app.get('/*', (req, res) => res.sendFile(root_path));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
