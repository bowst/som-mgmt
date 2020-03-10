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

export const getVariantMetafields = async variantId => {
	try {
		const urlParams = new URLSearchParams({ variantId });
		const response = await fetch('/api/getVariantMetafields?' + urlParams);
		const json = await response.json();
		return json.metafields;
	} catch (error) {
		throw Error(error);
	}
};
