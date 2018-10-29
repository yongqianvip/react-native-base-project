import React from 'react';
import { View, Text, Button, PanResponder } from 'react-native';
import Storage from './../utils/storage.js'
import { connect } from 'react-redux';
import DashLine from '../common/dashLine.js'
import PropTypes from 'prop-types';
import {AppNavigator} from '../constant/routers.js'

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    // this.state = {
    //   x: 0,
    //   y: 10,
    // }
  }
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
  componentWillMount(){
    this._x = 0
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // console.log('开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！',gestureState.moveX,gestureState.moveY);
        // this._x = this.state.x
        // this._y = this.state.y
        // gestureState.{x,y} 现在会被设置为0
      },
      onPanResponderMove: (evt, gs) => {
        // console.log('=== +  ' + this.state.x);
        console.log('最近一次 dx=' + gs.dx + ' dy=' + gs.dy + ' moveX=' + gs.moveX + ' moveY=' + gs.moveY + ' vx=' + gs.vx + ' vy=' + gs.vy + ' x0=' + gs.x0 + ' y0=' + gs.y0);

        if (this._x+ gs.dx<-0.5) {
          return;
        }

        // 最近一次的移动距离为gestureState.move{X,Y}
        // 从成为响应者开始时的累计手势移动距离为gs.d{x,y}
        if (this._x + gs.dx < 100) {
          this.panView && this.panView.setNativeProps({
            style: {
              left: this._x + gs.dx
            }
          })
        }else{
          console.log('拖得太远了 慢点儿',this._x + gs.dx,((320-this._x - gs.dx)/320),this._x + gs.dx * (1-(320-this._x - gs.dx)/320));
          return;
          this.panView && this.panView.setNativeProps({
            style: {
              left: this._x + gs.dx * (1-(320-this._x - gs.dx)/320)
            }
          })
        }

      },
      onPanResponderTerminationRequest: (evt, gs) => true,
      onPanResponderRelease: (evt, gs) => {

        if (this._x + gs.dx * 0.9 < 30) {
          this.panView && this.panView.setNativeProps({
            style: {
              left: 0
            }
          })
          this._x = 0
        }else if (this._x + gs.dx * 0.9 < 100) {
          this.panView && this.panView.setNativeProps({
            style: {
              left: 100
            }
          })
          this._x = 100
        }else if (this._x + gs.dx * 0.9 >= 100) {
          this.panView && this.panView.setNativeProps({
            style: {
              left: 100
            }
          })
          this._x = 100
        }

        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      }
    });
  }
  render() {
  	const {navigation} = this.props
    const { params } = navigation.state;

    // console.log('xy: ',x,y);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,backgroundColor: 'white'}}>
      <Text>99</Text>
        <Text onPress={()=>{
        	console.log(" ---- navigation.state",navigation.state);
        	navigation.setParams({
        		name: '999'
        	})
        }}>Change Home Tab x  name</Text>
        <Button onPress={() => navigation.navigate('DetailsScreen',{haha: 'hehe'})}
          title="Go to tails 98989"/>
        <Button onPress={() => {
        	Storage.save('FIRSTINIT','0')
        }}
          title="show welcome next reload "/>
        <Button onPress={() => navigation.navigate('WeatherScreen')}
          title="Show Weather"/>
        <View ref={(ref)=>{
          this.panView = ref
        }} {...this._panResponder.panHandlers} style={{width: 375,height: 50, position: 'absolute', backgroundColor: 'red', left:0, top: 10}}></View>
      </View>
    );
  }
}
const mapstateToProps = (state)=>{
  console.log('====================================');
  console.log('===??? state ',state);
  console.log('====================================');
	return {
		foo: state
	}
}

export default connect(mapstateToProps)(HomeScreen)