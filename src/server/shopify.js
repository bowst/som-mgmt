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

exports.listProducts = async () => {
	try {
		const products = await shopify.product.list();
		return products;
	} catch (error) {
		return error;
	}
};

exports.getProduct = async productId => {
	try {
		const product = await shopify.product.get(productId);
		return product;
	} catch (error) {
		return error;
	}
};

exports.listProductImages = async productId => {
	try {
		const images = await shopify.productImage.list(productId);
		return images;
	} catch (error) {
		return error;
	}
};

// Metafields

exports.getVariantMetafields = async variantId => {
	try {
		const mf = await shopify.metafield.list({
			metafield: { owner_resouce: 'product_variant', owner_id: variantId }
		});
		return mf;
	} catch (error) {
		return error;
	}
};
