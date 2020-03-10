import React, { Component } from 'react';
import { Segment, Card } from 'semantic-ui-react';

export const VariantImages = ({ images }) => {
	// console.log('images: ', images);
	// return <div>Hello</div>;

	if (!images || images == []) {
		return <Segment>No images assigned to this product.</Segment>;
	}
	return (
		<Segment>
			<Card.Group itemsPerRow={4}>
				{images.map((img, i) => {
					return <Card image={img.src} key={i} />;
				})}
			</Card.Group>
		</Segment>
	);
};
