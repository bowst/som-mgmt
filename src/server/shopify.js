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
const auth_token = btoa(process.env.SHOPIFY_API_KEY + ':' + process.env.SHOPIFY_PASSWORD);

const headers = {
	Authorization: 'Basic ' + auth_token,
	'Content-Type': 'application/json'
};

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

exports.getProductVariantMetafields = async productId => {
	try {
		const mf = await shopify.metafield.list({
			metafield: { owner_resource: 'product', owner_id: productId }
		});
		return mf;
	} catch (error) {
		return error;
	}
};

exports.createProductMetafields = async ({ key, namespace, value, value_type, owner_resource, owner_id }) => {
	const url = base_url + `admin/api/2020-01/products/${owner_id}/metafields.json`;
	try {
		const params = {
			metafield: { key, namespace, value: JSON.stringify(value), value_type }
		};
		const body = JSON.stringify(params);
		const mf = await fetch(url, {
			method: 'POST',
			body,
			headers
		});
		let json = await mf.json();
		return mf;
	} catch (e) {
		throw e;
	}
};

exports.editMetafield = async ({ value, value_type, id }) => {
	const url = base_url + `admin/api/2020-01/metafields/${id}.json`;
	try {
		const params = {
			metafield: { value_type, value: JSON.stringify(value), id }
		};
		const body = JSON.stringify(params);
		const mf = await fetch(url, {
			method: 'PUT',
			body,
			headers
		});
		let json = await mf.json();
		return mf;
	} catch (e) {
		throw e;
	}
};

exports.deleteMetafield = async (id, product_id) => {
	const url = base_url + `admin/api/2020-01/products/${product_id}/metafields/${id}.json`;
	try {
		const mf = await fetch(url, {
			method: 'DELETE',
			headers
		});
		let json = await mf.json();
		return json;
	} catch (e) {
		console.log('e: ', e);
		throw e;
	}
};

exports.createVariantMetafields = async ({ key, namespace, value, value_type, owner_resource, variantIds }) => {
	const metafields = variantIds.map(async owner_id => {
		const mf = await shopify.metafield
			.create({
				key,
				value,
				value_type,
				namespace,
				owner_resource,
				owner_id
			})
			.catch(e => {
				console.log('e: ', e);

				throw e;
			});
		console.log('mf', mf);
		return mf;
	});
	return metafields;
};
