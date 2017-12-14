import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import backIcon from './../../assets/icon/back.png'

export default class BackButton extends React.Component{
  render(){
    const navigation = this.props.navigation
    return (
      <View style={{width: 44,height: 44,justifyContent: 'center', alignItems:'center'}}>
        <TouchableOpacity onPress={()=>{
          if (this.props.onClick) {
            this.props.onClick()
          }else if (navigation) {
            navigation.goBack && navigation.goBack()
          };
        }}>
          <Image source={backIcon} style={{width: 25,height: 25}}/>
        </TouchableOpacity>
      </View>
    )
  }
}
