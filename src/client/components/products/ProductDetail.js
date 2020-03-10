import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Header, Dimmer, Loader, Segment, Breadcrumb, Table, Card } from 'semantic-ui-react';

import { getProduct } from '../../services/shopify';

export default class ProductDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			product: props.location.state.product
		};
	}

	componentDidMount() {
		const { product } = this.state;
		const productId = this.props.match.params.id;
		if (!product && productId) {
			this.getProduct(productId);
		}
	}

	async getProduct(productId) {
		try {
			const product = await getProduct(productId);
			this.setState({ product });
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
							state: { product, variant }
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
