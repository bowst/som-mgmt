import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Header, Dimmer, Loader, Segment, Breadcrumb } from 'semantic-ui-react';

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
		console.log('product', product);
		if (!product) {
			return (
				<Dimmer active>
					<Loader />
				</Dimmer>
			);
		}
		return (
			<div>
				<Segment textAlign="left" basic>
					<Breadcrumb>
						<Breadcrumb.Section>
							<Link to="/">Products</Link>
						</Breadcrumb.Section>
						<Breadcrumb.Divider />
						<Breadcrumb.Section active>{product.title}</Breadcrumb.Section>
					</Breadcrumb>
				</Segment>
				<Header>{product.title}</Header>
			</div>
		);
	}
}
