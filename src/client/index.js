import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ShopifyContext from './context/ShopifyContext';
console.log('ShopifyContext: ', ShopifyContext);

import { BrowserRouter } from 'react-router-dom';

const options = {
	sizeOption: 'option1',
	colorOption: 'option2'
};

ReactDOM.render(
	<BrowserRouter>
		<ShopifyContext.Provider value={options}>
			<App />
		</ShopifyContext.Provider>
	</BrowserRouter>,
	document.getElementById('root')
);
