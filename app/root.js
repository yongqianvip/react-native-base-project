'use strict';

import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './store/store.js'
import App from './containers/app.js'

const store = configureStore();

class Root extends React.Component {

	constructor(props) {
	  super(props);
	  console.log('app init .....');
	}

	render() {
		return (
			<Provider store={ store }>
				<App />
			</Provider>
		);
	}
}

export default Root;