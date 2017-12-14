
import React from 'react';
import { View, Text, Button, NativeModules } from 'react-native';
import { connect } from 'react-redux';
import CountDownButton from 'react-native-smscode-count-down'
import BackButton from '../common/backButton.js'

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '123',
    gesturesEnabled: true,
    headerLeft: (<BackButton navigation={navigation}/>)
  });
  componentDidMount() {
  	console.log(" == > this.props.dispatch detail ",this.props.navigation);
  }
  render() {
  	const {navigation} = this.props
    const { params } = navigation.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,backgroundColor: 'white'}}>
        <CountDownButton
          style={{width: 110,marginRight: 10,backgroundColor: 'white',borderRadius: 8,borderWidth:1,height: 30,borderColor: 'blue'}}
          textStyle={{color: 'blue'}}
          timerCount={60}
          timerActiveTitle={['请在', 's后重试']}
          timerTitle={'获取验证码'}
          enable={true}
          onClick={(shouldStartCounting)=>{
            //随机模拟发送验证码成功或失败
            const requestSucc = Math.random() + 0.5 > 1;
              shouldStartCounting(requestSucc)
          }}
          timerEnd={()=>{
            this.setState({
              state: '倒计时结束'
            })
          }}/>

          <Button
            onPress={() => {
              navigation && navigation.navigate && navigation.navigate('TempScreen')
            }}
            title="动画演示"/>
          <Button
            onPress={() => {
              navigation && navigation.navigate && navigation.navigate('ProgressViewScreen')
            }}
            title="Progress"/>

          <Button onPress={() => {
          	console.log("===== show full screen ");
          	// setTimeout(()=>{
	          	NativeModules.FullScreen.show()
          	// }, 500);
          	let progress = 0
          	this.interval = setInterval(()=>{
          		progress += 1
          		console.log("==== progress ",progress);
							NativeModules.FullScreen.updateProgress(`更新${progress}%`)
							if (progress >= 100) {
								this.interval && clearInterval(this.interval)
								NativeModules.FullScreen.close()
								console.log(" close !");

							};
          	}, 100)
          }}
          				title="show full screen"/>
      </View>
    );
  }
}

export default connect()(DetailsScreen)