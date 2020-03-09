/* eslint-disable no-tabs */
import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import { Route, Switch } from 'react-router-dom';

import { Container, Icon, Header, Segment } from 'semantic-ui-react';
import ProductList from './components/products/ProductList';
import ProductDetail from './components/products/ProductDetail';

export default class App extends Component {
	render() {
		return (
			<Container>
				<Segment inverted>
					<Header as="h2" color="red">
						<Icon name="shopping cart" />
						<Header.Content>
							Shopify Product Management
							<Header.Subheader>State of Matter</Header.Subheader>
						</Header.Content>
					</Header>
				</Segment>
				<Switch>
					<Route path="/products/:id" component={ProductDetail} />
					<Route path="/" component={ProductList} />
				</Switch>
			</Container>
		);
	}
}
