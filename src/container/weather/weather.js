
import React from 'react';
import { View, Text, Button, NativeModules, FlatList, Dimensions} from 'react-native';
import Geolocation from 'Geolocation'
import { connect } from 'react-redux';
import BackButton from '../../common/backButton.js'
import {Fetch} from '../../action/index.js'
import * as API from '../../constant/api.js'
import {updateLocationAction} from '../../action/location.js'
import {updateWeatherAction} from '../../action/weather.js'
import Helper from '../../utils/helper.js'
import Permissions from 'react-native-permissions'
import {getAMapLocation, getBaiduMapLoacation, getAddressWithLocation} from '../../utils/geolocation.js'

const {height,width} = Dimensions.get('window')

class WeatherScreen extends React.Component {
  constructor(props){
    super(props)
    this._renderRow = this._renderRow.bind(this)
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'Weather',
    gesturesEnabled: true,
    headerLeft: (<BackButton navigation={navigation}/>)
  });
  componentDidMount() {
    const dateString = Helper.getDateString()
    console.log(" ===== dataString ",dateString);
    this.props.getLocationInfo({
      gpstype: 'gd',
      lat: '40.20533',
      lon: '116.281614',
      t: new Date().getTime(),
      type: 'gps'
    })
  }
  _getCurrentLocation(){
    Geolocation.getCurrentPosition(
      location => {
          console.log("=== >>>> location",location);
            var result = "速度：" + location.coords.speed +
                        "\n经度：" + location.coords.longitude +
                        "\n纬度：" + location.coords.latitude +
                        "\n准确度：" + location.coords.accuracy +
                        "\n行进方向：" + location.coords.heading +
                        "\n海拔：" + location.coords.altitude +
                        "\n海拔准确度：" + location.coords.altitudeAccuracy +
                        "\n时间戳：" + location.timestamp;
            alert(result);
          const aMapLocation = getAMapLocation(location.coords.longitude,location.coords.latitude);
          console.log("==高德坐标 ",aMapLocation.longitude+','+aMapLocation.latitude);
          const baiduMapLocation = getBaiduMapLoacation(location.coords.longitude,location.coords.latitude)
          console.log("==百度坐标 ", baiduMapLocation.longitude+','+baiduMapLocation.latitude);

          getAddressWithLocation(location.coords.longitude,location.coords.latitude).then(response=>{
            console.log(" -- 位置解析 ",response)
          },error=>{

          });
        },
        error => {
          alert("获取位置失败："+ error)
        }
    );
  }
  componentWillReceiveProps(nextProps) {
    console.log("=== nextProps ",nextProps);
    const oldId = this.props.location.get('locationId')
    const newId = nextProps.location.get('locationId')

    if (nextProps.location && newId && oldId != newId) {
      console.log(" === 位置更新了  ", this.props.location.get('locationId'));
      console.log(" === new location ", nextProps.location.get('locationId'));
      this.props.getWeatherInfo({
        citykey: newId
      })
    };


  }
  _renderRow({item}){
    return (
      <View style={{justifyContent: 'space-between',alignItems: 'center',padding: 8}}>
        <Text>{item.date}</Text>
        <View style={{justifyContent: 'center',alignItems: 'center'}}>
          <Text>{item.day.wthr}</Text>
          <Text>{item.day.wd + item.day.wp}</Text>
        </View>
        <View style={{height: 40, justifyContent: 'center'}}>
          <Text>{item.low + '℃/' + item.high + '℃'}</Text>
        </View>
        <View style={{justifyContent: 'center',alignItems: 'center'}}>
          <Text>{item.night.wthr}</Text>
          <Text>{item.night.wd + item.night.wp}</Text>
        </View>
      </View>
    )
  }

  _keyExtractor = (item, index) => {return item.date}

  render() {
  	const {navigation, location={}, weather={}} = this.props
    const { params } = navigation.state;
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <Text>Weather in 7 days</Text>
        <FlatList
          data={weather.forecast || []}
          renderItem={this._renderRow}
          keyExtractor={this._keyExtractor}
          horizontal={true}
          style={{height: 200,width}}/>
        <View style={{height: height - 64 - 200, justifyContent:'center', alignItems: 'center'}}>
          <Button onPress={() => {
            Permissions.check('location', 'whenInUse').then(response => {
              console.log(" 定位权限：",response);
              // Response is one of:
              // 'authorized',已授权 允许
              // 'denied', 拒绝
              // 'restricted', iOS受限制的（如家长控制） Android (用户选择不再询问)
              // 'undetermined' 正在选择 未决定

              // support types:  location camera microphone photo contacts  event

              if (response === 'undetermined') {
                Permissions.request('location','whenInUse').then(response => {
                  console.log("===== request location permission = ",response);
                  if (response === 'authorized') {
                    this._getCurrentLocation()
                  };
                })
              }else if (response === 'denied') {
                alert('请在设置中允许我获取你的位置')
              }else if (response === 'authorized') {
                this._getCurrentLocation()
              };
            })

          }}
            title="GPS"/>

          <Button onPress={() => {
            this.props.getLocationInfo({
              gpstype: 'gd',
              lat: '32.667695',
              lon: '112.851196',
              t: new Date().getTime(),
              type: 'gps'
            })
          }}
            title="唐河"/>
          <Button onPress={() => {
            this.props.getLocationInfo({
              gpstype: 'gd',
              lat: '40.20533',
              lon: '116.281614',
              t: new Date().getTime(),
              type: 'gps'
            })
          }}
            title="昌平"/>
          <Button onPress={() => {
            console.log( 'city id == ',this.props.location.get('locationId'));
            this.props.navigation.navigate('WeatherWebScreen',{cityId: this.props.location.get('locationId')})
          }}
            title="天气详情"/>
        </View>
      </View>
    );
  }
}
const mapstateToProps = (state)=>{
  const {location,weather} = state;
  console.log('====================================');
  console.log(state);
  console.log('====================================');
  return {
    location,
    weather: weather.get('weather').toJS()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch,
    getLocationInfo: (body) =>{
      dispatch(Fetch({
        url: API.GET_LOCATION_INFO,
        requestType: 'get',
        body,
        success: (data)=>{
          dispatch(updateLocationAction(data.data[0]))
        }
      }))
    },
    getWeatherInfo: (body) => {
      body.app_key = 99817882
      body.date = Helper.getDateString()
      dispatch(Fetch({
        url: API.API_GET_WEATHER_INFO,
        body,
        requestType: 'get',
        success: (data)=>{
          dispatch(updateWeatherAction(data))
        },
        fail: (failure)=>{

        }
      }))
    }
  }
}

export default connect(mapstateToProps, mapDispatchToProps)(WeatherScreen)