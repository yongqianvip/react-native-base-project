import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Camera from 'react-native-camera';
import * as Progress from 'react-native-progress';

let getBarCode = false

class MineScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      cameraMode: Camera.constants.CaptureMode.video,
      handleTitle: '长按录制',
      counter: 10,
      progress: 0
    }
    this._takeVideo = this._takeVideo.bind(this)
    this._takePicture = this._takePicture.bind(this)
    this._changeMode = this._changeMode.bind(this)
    this._rest = this._rest.bind(this)
    this._runProgress = this._runProgress.bind(this)

  }
  static navigationOptions = ({ navigation }) => ({
    title: '我的',
    headerTitle: '',
    tabBarIcon: ({tintColor}) => (
      <Text style={{fontFamily: 'iconfont',fontSize: 25, color: tintColor}}>&#xe617;</Text>
    )
  });
  componentDidMount() {


  }
  _runProgress(){
    this.setState({
      progress: 0
    })
    this._intervalID = setInterval(()=>{
      if (this.state.progress >= 1) {
        this._intervalID && clearInterval(this._intervalID)
      }else{
        const newpg = this.state.progress + 0.01
        this.setState({
          progress: newpg >= 1.0 ? 1.0 : newpg
        })
        if (this.state.counter - 1 >= 0) {
          this.setState({
            counter: this.state.counter - 1,
            handleTitle: this.state.counter--
          })
        };
      }
    },100)
  }
  render() {
  	const {navigation} = this.props
    const {progress} = this.state
    const { params } = navigation.state;
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          style={{width: 200,height: 200}}
          aspect={Camera.constants.Aspect.fill}
          type={Camera.constants.Type.back}
          defaultOnFocusComponent={true}>
        </Camera>

        <Button
          onPress={this._changeMode}
          title={`模式/ ${this.state.cameraMode === Camera.constants.CaptureMode.video ? '视频' : '照片'}`}/>

        <Button
          onPress={this._rest}
          title={'REST'}/>

        <TouchableOpacity
          style={{alignItems: 'center'}}
          activeOpacity={1}
          onPressIn={()=>{
            if (this.state.cameraMode === Camera.constants.CaptureMode.video) {
              console.log("按下 开始录制视频");
              this._takeVideo()
              this._runProgress()
            }
          }}
          onPressOut={()=>{
            if (this.state.cameraMode === Camera.constants.CaptureMode.video) {
              console.log("松开 结束录制");
              this._intervalID && clearInterval(this._intervalID)
              this.setState({progress: 0})
              if (this.camera && this.camera.stopCapture) {
                console.log("call api to stopping ");
                setTimeout(()=>{
                  this.camera.stopCapture()
                }, 500);

              }
            }
          }}
          onPress={()=>{
            if (this.state.cameraMode === Camera.constants.CaptureMode.still) {
              this._takePicture()
            };
          }}>
          <Progress.Circle size={100}
            color={'orange'}
            formatText={(progress)=>{
              console.log("==== progress",progress);
              return this.state.handleTitle
            }}
            unfilledColor={'yellow'}
            progress={progress}
            borderRadius={100/2}
            backgroundColor={'gray'}
            borderWidth={0}
            thickness={5}
            direction={'clockwise'}
            strokeCap={'round'}
            showsText={true}/>
        </TouchableOpacity>
      </View>
    );
  }

  _takeVideo() {
    console.log("开始录制");
    const options = {totalSeconds: 10,mode: Camera.constants.CaptureMode.video};
    this.camera.capture(options)
      .then((data) => {
        console.log('录制完成：',data)
        this._intervalID && clearInterval(this._intervalID)
        this.setState({
          handleTitle: '长按录制',
          counter: 10
        })
      })
      .catch(err => console.error(err));
  }

  _takePicture() {
    console.log("--- take picture clicl ---");
    const options = {mode: Camera.constants.CaptureMode.still};
    this.camera.capture(options)
      .then((data) => console.log('take picture',data))
      .catch(err => console.error(err));
  }
  _rest(){
    if (this.camera && this.camera.stopPreview) {
      this.camera.stopPreview()
    }else if (this.camera && this.camera.startPreview){
      this.camera.startPreview()
    }
  }

  _changeMode(){
    if (this.state.cameraMode === Camera.constants.CaptureMode.video) {
      this.setState({
        cameraMode: Camera.constants.CaptureMode.still,
        handleTitle: '点击拍照'
      })
    }else{
      this.setState({
        cameraMode: Camera.constants.CaptureMode.video,
        handleTitle: '长按录制'
      })
    }
  }


  onBarCodeRead(e) {
    if (!getBarCode) {
      alert(e.data)
      getBarCode = true
    }
    console.log(
        "Barcode Found!",
        "Type: " + e.type + "\nData: " + e.data
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  preview: {

    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    width: 100, height: 50,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 5
  }
});
const mapstateToProps = (props)=>{
	return {
		foo: props
	}
}

export default connect(mapstateToProps)(MineScreen)

