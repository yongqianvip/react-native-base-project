
import React from 'react';
import { View, Text, Button, NativeModules } from 'react-native';
import { connect } from 'react-redux';
import CountDownButton from 'react-native-smscode-count-down'
import BackButton from '../../common/backButton.js'
import * as Progress from 'react-native-progress';


class ProgressViewScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Progress - ART',
    gesturesEnabled: true,
    headerLeft: (<BackButton navigation={navigation}/>)
  });
  constructor(props){
    super(props)
    this.state = {
      progress: 0
    }
    this._runProgress = this._runProgress.bind(this)
  }
  _runProgress(){
    this.setState({
      progress: 0
    })
    this._intervalID = setInterval(()=>{
      // console.log(" === progress",this.state.progress);
      if (this.state.progress >= 1) {
        this._intervalID && clearInterval(this._intervalID)
      }else{
        const newpg = this.state.progress + 0.01
        this.setState({
          progress: newpg >= 1.0 ? 1.0 : newpg
        })
      }
    },100)
  }
  componentDidMount() {

  }
  render() {
  	const {navigation} = this.props
    const { params } = navigation.state;
    const {progress = 0} = this.state

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,backgroundColor: 'white'}}>
        <Button onPress={this._runProgress}
          title="run"/>
        <Progress.Bar progress={progress} width={100} style={{margin: 10,backgroundColor: 'red'}} backgroundColor='yellow'/>

        <Progress.Pie progress={progress} size={50}/>

        <Progress.Circle size={150}
          color={'orange'}
          formatText={(progress)=>{
            console.log("==== progress",progress);
            return '进度' + parseInt(progress * 100)
          }}
          unfilledColor={'yellow'}
          progress={progress}
          borderRadius={75}
          backgroundColor={'gray'}
          borderWidth={0}
          thickness={10}
          direction={'clockwise'}
          strokeCap={'round'}
          showsText={true}/>

        <Progress.CircleSnail
          color={['#999']}
          duration={1000}
          spinDuration={3000}/>
      </View>
    );
  }
}

export default connect()(ProgressViewScreen)