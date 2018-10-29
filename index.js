import React from 'react';
import { AppRegistry } from 'react-native';

import App from './App';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './src/reducers/index.js'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import Fetch from './src/middleware/http.js'

const logger = createLogger({
// logger options
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware, Fetch ));

// console.log(" ---- store",store);
class Root extends React.Component {

  constructor(props) {
    super(props);
  	this.store = store
  }

  render() {
    return (
      <Provider store={ this.store }>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('react_native_project', () => Root);
