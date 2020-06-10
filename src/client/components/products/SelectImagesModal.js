import React, { useState, useEffect, useContext } from 'react';
import { Segment, Card, Modal, Button, Icon, Header, Image } from 'semantic-ui-react';
import { Loading } from '../Loading';

import { getProductVariantMetafields, createVariantImages } from '../../services/shopify';
import ShopifyContext from '../../context/ShopifyContext';

/**
 * Select images for assigning to a color variant.
 * The images are saved as Shopfiy Metafields as type json_string and are replicated
 * for each variant in the set.
 *
 * @param {variants} props
 */
export const SelectImagesModal = props => {
	const [variants, setVariants] = useState(props.variants);
	const [product, setProduct] = useState(props.product);
	const [color, setColor] = useState(props.color);
	const [productMeta, setProductMeta] = useState();
	const [images, setImages] = useState(props.images);
	const [selectedImages, setSelected] = useState([]);
	const options = useContext(ShopifyContext);
	const [saving, setSaving] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	// Save vars
	const namespace = 'color_images';
	const key = color.replace(/\s+/g, '_').toLowerCase();

	useEffect(() => {
		const getProductMeta = async () => {
			const mf = await getProductVariantMetafields(product.id);
			console.log('mf: ', mf);
			setProductMeta(mf);
		};
		getProductMeta();
	}, []);

	if (!images) {
		return <Loading />;
	}

	const handleSelect = id => {
		const selected = selectedImages.includes(id);
		const newSelected = selected ? selectedImages.filter(x => x !== id) : [...selectedImages, id];
		setSelected(newSelected);
	};

	const handleSave = async () => {
		console.log('variants', variants);
		console.log('selectedImages', selectedImages);

		setSaving(true);

		const imagesValue = images
			.filter(x => selectedImages.includes(x.id))
			.map(img => {
				return { id: img.id, url: img.src };
			});

		console.log('imagesValue: ', imagesValue);

		// const metaValue = {
		// 	metafield: imagesValue
		// };

		const params = {
			owner_id: product.id,
			variantIds: variants.map(x => x.id),
			value: imagesValue,
			key,
			namespace
		};

		console.log('imagesValue: ', imagesValue);
		console.log('params', params);

		try {
			const updatedMetafields = await createVariantImages(params);
			console.log('updatedMetafields: ', updatedMetafields);
			setModalOpen(false);
		} catch (error) {
			setModalOpen(false);
			throw new Error(error);
		}
	};

	return (
		<Modal
			trigger={
				<Button style={{ marginTop: 10 }} onClick={() => setModalOpen(true)}>
					Select Images
				</Button>
			}
			open={modalOpen}
			onClose={() => setModalOpen(false)}
		>
			<Modal.Header>Select Images for {color}</Modal.Header>
			<Modal.Content scrolling>
				<Modal.Description>
					<p>These images will be assigned to all variants with this color.</p>
				</Modal.Description>
				<Segment>
					<Card.Group itemsPerRow={6}>
						{images.map((img, i) => {
							const selected = selectedImages.includes(img.id);
							const checked = selected ? <Icon circular name="check" color="blue" /> : null;
							return (
								<Card
									key={i}
									onClick={() => {
										handleSelect(img.id);
									}}
								>
									<Image src={img.src} />
									<Card.Content extra>{checked}</Card.Content>
								</Card>
							);
						})}
					</Card.Group>
				</Segment>
			</Modal.Content>
			<Modal.Actions>
				<Button primary onClick={() => handleSave()}>
					Save <Icon name="chevron right" />
				</Button>
			</Modal.Actions>
		</Modal>
	);
};
