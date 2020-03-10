import React, { useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import { Header, Dimmer, Loader, Segment, Breadcrumb, Table, Card } from 'semantic-ui-react';

import { getProduct } from '../../services/shopify';
import ShopifyContext from '../../context/ShopifyContext';

export const ProductDetail = props => {
	const [product, setProduct] = useState(props.product);
	const [match, setMatch] = useState(props.match);
	const options = useContext(ShopifyContext);
	console.log('options: ', options);

	useEffect(() => {
		const checkProps = async () => {
			const productId = match.params.id;
			if (!product && productId) {
				const newProduct = await getProduct(productId);
				setProduct(newProduct);
			}
			groupVariants();
		};
		checkProps();
	}, []);

	const groupVariants = () => {
		console.log('product', product);
	};

	const variantRow = variant => {
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
	};

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
						return variantRow(variant);
					})}
				</Table.Body>
			</Table>
		</div>
	);
};
