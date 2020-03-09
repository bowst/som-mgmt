/* eslint-disable no-tabs */
import React, { Component } from 'react';
import { Breadcrumb, Table, Loader, Dimmer, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Error from '../Error';
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
			this.setState({ products: json.products });
		} catch (error) {
			console.log('error', error);
		}
	}

	productRow(product) {
		return (
			<Table.Row key={product.id}>
				<Table.Cell>
					<Link
						to={{
							pathname: `/products/${product.id}`,
							state: { product }
						}}
					>
						{product.title}
					</Link>
				</Table.Cell>
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
			<div>
				<Segment textAlign="left" basic>
					<Breadcrumb>
						<Breadcrumb.Section>Products</Breadcrumb.Section>
					</Breadcrumb>
				</Segment>

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
			</div>
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
