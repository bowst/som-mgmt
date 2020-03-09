import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Header, Dimmer, Loader, Segment, Breadcrumb, Table } from 'semantic-ui-react';

export default class ProductDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			product: props.location.state.product
		};
	}

	componentDidMount() {
		const { product } = this.state;
		// console.log('this.props.match.params.id', this.props.match.params.id);
		const productId = this.props.match.params.id;
		console.log('productId', productId);

		if (!product && productId) {
			this.getProduct(productId);
		}
	}

	async getProduct(productId) {
		try {
			const response = await fetch('/api/getProduct', { productId });
			const json = await response.json();
			this.setState({ product: json.product });
		} catch (error) {
			console.log('error', error);
		}
	}

	variantRow(variant) {
		return (
			<Table.Row key={variant.id}>
				<Table.Cell>
					<Link
						to={{
							pathname: `/products/${variant.product_id}/variant/${variant.id}`,
							state: {}
						}}
					>
						{variant.title}
					</Link>
				</Table.Cell>
			</Table.Row>
		);
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
				<Table celled striped>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell colSpan="3">Variants</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{product.variants.map(variant => {
							return this.variantRow(variant);
						})}
					</Table.Body>
				</Table>
			</div>
		);
	}
}
