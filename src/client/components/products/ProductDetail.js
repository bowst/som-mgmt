import React, { Component } from 'react';

import {} from 'react-router-dom';
import { Header, Dimmer, Loader } from 'semantic-ui-react';

export default class ProductDetail extends Component {
	constructor(props) {
		super(props);
		// console.log('props', props);

		this.state = {
			product: props.location.state.product
		};
	}

	render() {
		const { product } = this.state;
		if (!product) {
			return (
				<Dimmer active>
					<Loader />
				</Dimmer>
			);
		}
		return (
			<div>
				<Header>{product.title}</Header>
			</div>
		);
	}
}
