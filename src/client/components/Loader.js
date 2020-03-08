import React, { Component } from 'react';

import { Dimmer, Loader, Image, Segment } from 'react-semantic-ui';

export default class Loader extends Component {
	render() {
		return (
			<Segment>
				<Dimmer active>
					<Loader />
				</Dimmer>
			</Segment>
		);
	}
}
