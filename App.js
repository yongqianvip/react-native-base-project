import React from 'react';
import { View, Text, Button, Modal } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator, addNavigationHelpers } from 'react-navigation';
import Storage from './src/utils/storage.js'
import { connect } from 'react-redux';
import { AppNavigator } from './src/constant/routers.js'
import { Provider } from 'react-redux'
import configureStore from './src/store/store'
import { Root } from "native-base";
var _ = require('lodash');

const store = configureStore();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showWelcome: false
    }

    Storage.get('FIRSTINIT').then(value => {
      this.setState({
        showWelcome: !value
      })
    })
    Text.prototype.render = _.wrap(Text.prototype.render, function (func, ...args) {
      let originText = func.apply(this, args);
      return React.cloneElement(originText, {
          style: [
            originText.props.style,
            {
              allowFontScaling: false,
              color: 'brown',
              suppressHighlighting: true
            }
          ]
      });
    });
  }

  render() {
    // const {showWelcome} = this.state
    return (
      <Root>
        <Provider store={store}>
          <AppNavigator
            navigation={addNavigationHelpers({
              dispatch: this.props.dispatch,
              state: this.props.nav
            })}
            ref={nav => this.navigator = nav} />
        </Provider>
      </Root>
    )
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

export default connect(mapStateToProps)(App);
