/* eslint-disable no-tabs */
import React, { Component } from 'react';
import { Breadcrumb, Table, Loader, Dimmer, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Error from '../Error';
import { sortBy, reverse } from 'lodash';

const moment = require('moment');

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
			const products = json.products;
			const sortedProducts = sortBy(products, p => {
				const updatedUnix = moment(p.updated_at).unix();
				return updatedUnix;
			});
			this.setState({ products: reverse(sortedProducts) });
		} catch (error) {
			console.log('error', error);
		}
	}

	productRow(product) {
		const updatedDate = moment(product.updated_at).format('MMM D, YYYY hh:mm a');
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
				<Table.Cell>{updatedDate}</Table.Cell>
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
							<Table.HeaderCell>Products</Table.HeaderCell>
							<Table.HeaderCell>Last Updated</Table.HeaderCell>
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
