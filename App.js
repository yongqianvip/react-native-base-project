import React from 'react';
import { View, Text, Button, Modal } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator, addNavigationHelpers } from 'react-navigation';
import Storage from './src/utils/storage.js'
import { connect } from 'react-redux';
import {AppNavigator} from './src/constant/routers.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showWelcome: false
    }

    Storage.get('FIRSTINIT').then(value=>{
      this.setState({
        showWelcome: !value
      })
    })
  }

  render() {
    // const {showWelcome} = this.state
    return (
        <AppNavigator
          navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav
          })}
          ref={nav => this.navigator = nav} />
    )
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

export default connect(mapStateToProps)(App);
