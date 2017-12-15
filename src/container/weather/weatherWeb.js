import React, {Component} from 'react';
import { 
  View,
  WebView,
  Text
} from 'react-native';
import BackButton from '../../common/backButton';
import * as API from '../../constant/api.js'

export default class WeatherWeb extends Component {
  constructor (props) {
    super(props)
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'WeatherDetail',
    headerLeft: (<BackButton navigation={navigation}/>)
  });
  
  render() {
    const { params } = this.props.navigation.state;
    const url = API.API_WEATHER_WEB + '?city=' + params.cityId 
    return (
      <WebView automaticallyAdjustContentInsets={true} source={{uri: url}} style={{flex: 1}}>

      </WebView>
    )
  }
}