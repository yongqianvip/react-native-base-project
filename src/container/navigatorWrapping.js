
import React from 'react';
import { View, Text, Button } from 'react-native';

class NavigatorWrappingScreen extends React.Component {

  render() {
    return (
      <View>
        <SomeComponent/>
        <MainScreenNavigator navigation={this.props.navigation}/>
      </View>
    );
  }
}
NavigatorWrappingScreen.router = MainScreenNavigator.router;

export default NavigatorWrappingScreen