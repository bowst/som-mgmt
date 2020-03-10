import React, { Component } from 'react';
import { Segment, Card } from 'semantic-ui-react';

import { getVariantMetafields } from '../../../services/shopify';

import { groupBy } from 'lodash';

const sizeOption = 'option1';
const colorOption = 'option2';

export default class VariantImages extends Component {
	constructor(props) {
		super(props);
		console.log('props: ', props);

		this.state = {
			variantMetafields: null
		};
	}

	async componentDidMount() {
		const { images, variant } = this.props;

		if (!images || !variant) {
			return null;
		}

		const mf = await getVariantMetafields(variant.id);
		console.log('mf: ', mf);
	}

	render() {
		const { images, variant } = this.props;

		if (!images || images == []) {
			return (
				<Segment>
					No images assigned to this product. Please upload images to this product to assign them to variants.
				</Segment>
			);
		}

		return (
			<Segment>
				<Card.Group itemsPerRow={6}>
					{images.map((img, i) => {
						return <Card image={img.src} key={i} />;
					})}
				</Card.Group>
			</Segment>
		);
	}
}
