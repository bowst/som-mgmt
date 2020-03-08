/* eslint-disable no-tabs */
const btoa = require('btoa');
const fetch = require('node-fetch');
const Shopify = require('shopify-api-node');

// Read from .env
require('dotenv').config();

if (!process.env.SHOPIFY_API_KEY) {
	throw Error('You must set a SHOPIFY_API_KEY in your environment variables');
}

if (!process.env.SHOPIFY_PASSWORD) {
	throw Error('You must set a SHOPIFY_PASSWORD in your environment variables');
}

if (!process.env.SHOPIFY_BASE_URL) {
	throw Error('You must set a SHOPIFY_PASSWORD in your environment variables');
}
const base_url = process.env.SHOPIFY_BASE_URL;

const shopify = new Shopify({
	shopName: 'solid-matter',
	apiKey: process.env.SHOPIFY_API_KEY,
	password: process.env.SHOPIFY_PASSWORD
});

// const auth_token = btoa(process.env.SHOPIFY_API_KEY + ':' + process.env.SHOPIFY_PASSWORD);

// const headers = {
//     Authorization: 'Basic ' + auth_token
// };

exports.listProducts = async () => {
	// const url = base_url + '/admin/api/2020-01/products.json';
	console.log('test');

	try {
		const products = await shopify.product.list();
		console.log('products', products);
		return products;
	} catch (error) {
		console.log('error', error);
		return error;
	}
};
