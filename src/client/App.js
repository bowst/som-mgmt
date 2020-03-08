/* eslint-disable no-tabs */
import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';

import { Container, Icon, Form, TextArea, Header, Segment, Table, Button, Tab } from 'semantic-ui-react';
import ProductList from './components/ProductList';

const panes = [
	{
		menuItem: 'Products',
		render: () => (
			<Tab.Pane attached={false}>
				<ProductList />
			</Tab.Pane>
		)
	}
];

export default class App extends Component {
	render() {
		return (
			<Container>
				<Segment inverted>
					<Header as="h2" inverted color="red">
						<Icon name="shopping cart" />
						<Header.Content>
							Shopify Product Management
							<Header.Subheader>State of Matter</Header.Subheader>
						</Header.Content>
					</Header>
				</Segment>
				<Tab menu={{ secondary: true }} panes={panes} />
			</Container>
		);
	}
}
