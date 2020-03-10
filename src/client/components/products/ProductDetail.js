import React, { useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import { Header, Dimmer, Loader, Segment, Breadcrumb, Table, Card } from 'semantic-ui-react';

import { getProduct } from '../../services/shopify';
import ShopifyContext from '../../context/ShopifyContext';

import { groupBy } from 'lodash';

export const ProductDetail = props => {
	const [product, setProduct] = useState(props.product);
	console.log('product: ', product);
	const [match, setMatch] = useState(props.match);
	const options = useContext(ShopifyContext);
	console.log('options: ', options);

	useEffect(() => {
		const checkProps = async () => {
			const productId = match.params.id;
			if (!product && productId) {
				const newProduct = await getProduct(productId);
				console.log('newProduct: ', newProduct);
				setProduct(newProduct);
			}
		};
		checkProps();
	}, []);

	if (!product) {
		return (
			<Dimmer active>
				<Loader />
			</Dimmer>
		);
	}

	const variantsByColor = Object.entries(groupBy(product.variants, options.colorOption));

	const colorVariantRow = ([color, variants], i) => {
		console.log('color: ', color);
		console.log('variants: ', variants);
		const variantLength = variants.length;
		// return <Table.Row></Table.Row>;
		return variants.map((v, i) => {
			if (i === 0) {
				return (
					<Table.Row>
						<Table.Cell rowSpan={variantLength}>{color}</Table.Cell>
						<Table.Cell>{v.title}</Table.Cell>
					</Table.Row>
				);
			} else {
				return (
					<Table.Row>
						<Table.Cell>{v.title}</Table.Cell>
					</Table.Row>
				);
			}
		});
	};

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
						<Table.HeaderCell>Color</Table.HeaderCell>
						<Table.HeaderCell>Variants</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{variantsByColor.map((variants, i) => {
						return colorVariantRow(variants, i);
						// console.log('rows: ', rows);
						// return null;
					})}
				</Table.Body>
			</Table>
		</div>
	);
};
