import React, { useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import {
	Header,
	Card,
	Image,
	Segment,
	Breadcrumb,
	Grid,
	Menu,
	Rail,
	List,
	Table,
	Button,
	Icon,
} from 'semantic-ui-react';

import { getProduct, getProductVariantMetafields, deleteMetafield, getProductImages } from '../../services/shopify';
import ShopifyContext from '../../context/ShopifyContext';
import { SelectImagesModal } from './SelectImagesModal';
import { Loading } from '../Loading';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { groupBy, dropWhile } from 'lodash';

export const ProductDetail = (props) => {
	const [product, setProduct] = useState(props.product);
	const [productMeta, setProductMeta] = useState();
	const [images, setImages] = useState([]);
	const [tab, setTab] = useState(0);
	const [match, setMatch] = useState(props.match);
	const [pending, setPending] = useState();
	const [selectedImages, setSelected] = useState([]);
	const options = useContext(ShopifyContext);

	const getProductMeta = async (productId) => {
		const mf = await getProductVariantMetafields(productId);
		setProductMeta(mf);
	};

	const getImages = async (productId) => {
		const imgs = await getProductImages(productId);
		setImages(imgs);
	};

	useEffect(() => {
		const checkProps = async () => {
			const productId = match.params.id;
			if (!product && productId) {
				const newProduct = await getProduct(productId);
				setProduct(newProduct);
				getProductMeta(newProduct.id);
			}
			if (!productMeta) {
				getProductMeta(productId);
			}
			getImages(productId);
		};
		checkProps();
	}, []);

	if (!product || !productMeta) {
		return <Loading />;
	}

	const variantsByColor = Object.entries(groupBy(product.variants, options.colorOption));

	const [selectedColor, _variants] = variantsByColor.filter(([color, variants], i) => tab == i)[0];
	const colorMeta = productMeta.filter((x) => x.key == selectedColor.replace(/\s+/g, '_').toLowerCase());
	console.log('colorMeta: ', colorMeta);
	const colorImageIds = colorMeta
		.map((x) => {
			const metaVals = JSON.parse(x.value);
			return metaVals.map((m) => m.id);
		})
		.flat();
	console.log('colorImageIds', colorImageIds);
	const colorImages = images.filter((x) => colorImageIds.includes(x.id));
	const availableImages = images.filter((img) => {
		const taken = colorImageIds.includes(img.id);
		console.log('available: ', !taken);
		return !taken;
	});
	console.log('availableImages: ', availableImages);
	const otherMetafields = productMeta.filter((x) => x.key != selectedColor.replace(/\s+/g, '_').toLowerCase());
	const [color, variants] = variantsByColor[tab];

	const viewProductVariants = () => {
		return (
			<Segment>
				<List celled horizontal>
					<Header>Product Variants for Color {color}</Header>
					{variants.map((v, i) => (
						<List.Item key={i}>{v.title}</List.Item>
					))}
				</List>
			</Segment>
		);
	};

	const tabContent = (tabIndex) => {
		const handleSelect = (id) => {
			const selected = selectedImages.includes(id);
			const newSelected = selected ? selectedImages.filter((x) => x !== id) : [...selectedImages, id];
			setSelected(newSelected);
		};

		const viewColorImages = () => {
			return (
				<Card.Group itemsPerRow={6}>
					{colorImages.map((img, i) => {
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
			);
		};
		return (
			<Segment>
				<Header as="h4">{color}</Header>
				{viewProductVariants()}
				{viewColorImages()}
				<SelectImagesModal
					product={product}
					variants={variants}
					color={color}
					images={availableImages}
					onClose={() => getProductMeta(product.id)}
				/>
			</Segment>
		);
	};

	const viewOtherMeta = () => {
		const deleteMeta = async (mf) => {
			setPending(mf.id);
			try {
				await deleteMetafield(mf.id, mf.owner_id);
				setPending(null);
				getProductMeta(mf.owner_id);
			} catch (e) {
				console.log('e: ', e);
				// throw new Error(e);
			}
		};
		const viewRow = (mf, i) => {
			const disabled = pending == mf.id;
			const label = disabled ? 'Deleting' : 'Delete';
			return (
				<Table.Row key={mf.id}>
					<Table.Cell>{mf.namespace}</Table.Cell>
					<Table.Cell>{mf.key}</Table.Cell>
					<Table.Cell>
						<ReactQuill value={mf.value} readOnly={true} theme={'bubble'} />
					</Table.Cell>
					<Table.Cell textAlign="right">
						<Button onClick={() => deleteMeta(mf)} disabled={disabled}>
							{label}
						</Button>
					</Table.Cell>
				</Table.Row>
			);
		};
		return (
			<Segment>
				<Header>Other Metafields for this Product</Header>
				<Table celled striped>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Namespace</Table.HeaderCell>
							<Table.HeaderCell>Key</Table.HeaderCell>
							<Table.HeaderCell>Value</Table.HeaderCell>
							<Table.HeaderCell>Actions</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>{otherMetafields.map((mf, i) => viewRow(mf, i))}</Table.Body>
				</Table>
			</Segment>
		);
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

			<Segment>
				<Grid>
					<Grid.Column>
						<Menu pointing secondary>
							{variantsByColor.map(([color, variants], i) => {
								return <Menu.Item key={i} name={color} active={tab == i} onClick={() => setTab(i)} />;
							})}
						</Menu>
					</Grid.Column>
				</Grid>

				<Header>{product.title}</Header>

				{tabContent(tab)}
				{viewOtherMeta()}
			</Segment>
		</div>
	);
};
