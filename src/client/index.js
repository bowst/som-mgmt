import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ShopifyContext from './context/ShopifyContext';

import { BrowserRouter } from 'react-router-dom';

/**
 * Add system-wide options here
 */
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
