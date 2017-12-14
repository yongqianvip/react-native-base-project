import React from 'react';
import { View, Text, Button , Modal} from 'react-native';
import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'TabScreen'})
  ]
})


class WelcomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });
  render() {
    const {navigation,showWelcome} = this.props
    console.log(" navigaton == ",navigation);
    return (
      <Modal animationType={ "none" } transparent={true} visible={showWelcome} onRequestClose={()=>console.log('resolve warnning')} >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,backgroundColor: 'white'}}>
          <Button onPress={() => {
            // this.props.close && this.props.close()
            this.props.navigation.dispatch(resetAction)
          }}
                  title="This is WELCOME ! Go to Tab"/>
        </View>
      </Modal>

    );
  }
}

export default WelcomeScreen