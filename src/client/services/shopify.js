export const getProduct = async productId => {
	try {
		const urlParams = new URLSearchParams({ productId });
		const response = await fetch('/api/getProduct?' + urlParams);
		const json = await response.json();
		return json.product;
	} catch (error) {
		throw Error(error);
	}
};

export const getProductImages = async productId => {
	try {
		const urlParams = new URLSearchParams({ productId });
		const response = await fetch('/api/listProductImages?' + urlParams);
		const json = await response.json();
		return json.images;
	} catch (error) {
		throw Error(error);
	}
};

// Metafields

export const getProductVariantMetafields = async variantId => {
	try {
		const urlParams = new URLSearchParams({ variantId });
		const response = await fetch('/api/getProductVariantMetafields?' + urlParams);
		const json = await response.json();
		return json.metafields;
	} catch (error) {
		throw Error(error);
	}
};

export const createVariantImages = async ({ owner_id, namespace, value, key } = params) => {
	try {
		const params = {
			owner_id,
			value,
			key,
			namespace,
			value_type: 'json_string',
			owner_resource: 'product'
		};
		console.log('params', JSON.stringify(params));
		const response = await fetch('/api/createVariantMetafields', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
		});
		const json = await response.json();
		return json.metafields;
	} catch (error) {
		throw Error(error);
	}
};

export const editMetafield = async ({ value, value_type, id } = params) => {
	try {
		const params = {
			id,
			value,
			value_type: 'json_string'
		};
		const response = await fetch('/api/editMetafield', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
		});
		const json = await response.json();
		return json.metafield;
	} catch (error) {
		throw Error(error);
	}
};

export const deleteMetafield = async (id, product_id) => {
	try {
		const urlParams = new URLSearchParams({ id, product_id });
		const response = await fetch('/api/deleteMetafield?' + urlParams);
		console.log('response: ', response);
		const json = await response.json();
		console.log('json: ', json);
		return { ok: 'Metafield deleted' };
	} catch (error) {
		console.log('error: ', error);
		// throw Error(error);
	}
};
