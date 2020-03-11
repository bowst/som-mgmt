/* eslint-disable no-tabs */
import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import { Route, Switch } from 'react-router-dom';

import { Container, Icon, Header, Segment } from 'semantic-ui-react';
import Error from './components/Error';
import { ProductList } from './components/products/ProductList';
import { ProductDetail } from './components/products/ProductDetail';
// import VariantDetail from './components/products/variants/VariantDetail';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null
		};
	}

	componentDidCatch(error, info) {
		if (typeof error === 'string') {
			this.setState({ error });
		} else {
			console.log('error', error);
		}
	}

	showError() {
		const { error } = this.state;

		if (error) {
			return <Error header={this.state.errors} />;
		}
	}

	render() {
		return (
			<Container>
				<Segment textAlign="left">
					<Header as="h2" color="red">
						<Icon name="shopping cart" />
						<Header.Content>
							Shopify Product Management
							<Header.Subheader>State of Matter</Header.Subheader>
						</Header.Content>
					</Header>
				</Segment>
				{this.showError()}
				<Switch>
					{/* <Route exact path="/products/:productId/variant/:id" component={VariantDetail} /> */}
					<Route exact path="/products/:id" component={ProductDetail} />
					<Route path="/" component={ProductList} />
				</Switch>
			</Container>
		);
	}
}
