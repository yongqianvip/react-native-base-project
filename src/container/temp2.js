
import React from 'react';
import { View, Text, Button } from 'react-native';
import DetailsScreen from './detail.js'
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'TabScreen'})
  ]
})

const navigateAction = NavigationActions.navigate({
  routeName: 'DetailsScreen',
  params: {},
})

class Temp2Screen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Temp2Screen',
    labelText: '000',
    gesturesEnabled: true,
  });
  componentDidMount() {
    console.log("---- this.props.navigation",this.props);
  }
  render() {
  	const {navigation} = this.props
    const { params } = navigation.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,backgroundColor: 'white'}}>
        <Text>Temp2Screen</Text>
        <Button onPress={() => {
          console.log(" === > ",navigation.goBack);
          // navigation.goBack('id-1509679061572-1')
          this.props.navigation.dispatch(resetAction)


        }}
                title="Go Back"/>
      </View>
    );
  }
}

export default Temp2Screen//connect()(Temp2Screen)