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
		console.log('error', error);
	}
};
