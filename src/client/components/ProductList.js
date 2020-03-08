/* eslint-disable no-tabs */
import React, { Component } from 'react';
import {
	Container,
	Icon,
	Form,
	TextArea,
	Header,
	Segment,
	Table,
	Button,
	Tab,
	Loader,
	Dimmer
} from 'semantic-ui-react';
import Error from './Error';
// import Loader from './Loader';

export default class ProductList extends Component {
	constructor() {
		super();
		this.products;
		this.listProducts();

		this.state = {
			errors: null,
			products: null
		};
	}

	async listProducts() {
		try {
			const response = await fetch('/api/listProducts');
			const json = await response.json();
			// console.log('products', products);
			this.setState({ products: json.products });
		} catch (error) {
			console.log('error', error);
		}
	}

	productRow(product) {
		console.log('product', product.title);
		return (
			<Table.Row key={product.id}>
				<Table.Cell>{product.title}</Table.Cell>
			</Table.Row>
		);
	}

	productTable() {
		const { products } = this.state;

		if (!products) {
			return (
				<Dimmer active>
					<Loader />
				</Dimmer>
			);
		}

		return (
			<Table celled striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell colSpan="3">Products</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{products.map(product => {
						return this.productRow(product);
					})}
				</Table.Body>
			</Table>
		);
	}

	render() {
		return (
			<div>
				<Error header={this.state.errors} />
				{this.productTable()}
			</div>
		);
	}
}
