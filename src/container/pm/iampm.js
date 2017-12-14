import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import LinearGradient from 'react-native-linear-gradient';

class IamPmScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '产品',
    headerTitle: 'I am 产品经理',
    tabBarIcon: ({tintColor}) => (
      <Text style={{fontFamily: 'iconfont',fontSize: 25, color: tintColor}}>&#xe60e;</Text>
    )
  });
  componentDidMount() {


  }
  render() {
  	const {navigation} = this.props
    const { params } = navigation.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,backgroundColor: 'white'}}>
        <Button onPress={() => navigation.navigate('ArticleListScreen',{haha: 'hehe'})}
                title="ARTICLE LIST"/>
        <LinearGradient colors={['#333', '#fff']} style={{height: 150,width: 150}} start={{x:0,y:0}} end={{x:0.8,y:0.8}} locations={[0,1]}/>
      </View>
    );
  }
}
const mapstateToProps = (props)=>{
	return {
		foo: props
	}
}

export default connect(mapstateToProps)(IamPmScreen)