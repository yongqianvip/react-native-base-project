import React from 'react';
import { View, Text, Button } from 'react-native';
import Storage from './../utils/storage.js'
import { connect } from 'react-redux';
import DashLine from '../common/dashLine.js'
import PropTypes from 'prop-types';
import {AppNavigator} from '../constant/routers.js'

class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: '主页',
    headerTitle: '首页',
    tabBarIcon: ({tintColor}) => (
      <Text style={{fontFamily: 'iconfont',fontSize: 25, color: tintColor}}>&#xe60d;</Text>
    )
  });
  componentDidMount() {
    const nn = AppNavigator.router//.getComponentForRouteName('TabScreen')
    console.log(" == > this.props.dispatch foo ",nn);
  }

  render() {
  	const {navigation} = this.props
    const { params } = navigation.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,backgroundColor: 'white'}}>
        <Text onPress={()=>{
        	console.log(" ---- navigation.state",navigation.state);
        	navigation.setParams({
        		name: '999'
        	})
        }}>Change Home Tab name</Text>
        <Button onPress={() => navigation.navigate('DetailsScreen',{haha: 'hehe'})}
          title="Go to tails"/>
        <Button onPress={() => {
        	Storage.save('FIRSTINIT','0')
        }}
          title="show welcome next reload "/>
        <Button onPress={() => navigation.navigate('WeatherScreen')}
          title="Show Weather"/>

      </View>
    );
  }
}
const mapstateToProps = (props)=>{
	return {
		foo: props
	}
}

export default connect(mapstateToProps)(HomeScreen)