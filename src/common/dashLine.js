import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
const screenWidth = Dimensions.get('window').width;
export default class DashLine extends React.Component{
  render(){
    let width = this.props.width || (this.props.style ? this.props.style.width : '') || screenWidth
    const {perWidth} = this.props
    const len = Math.ceil(width/(perWidth * 2));
    const realPerWidth = width/len
    console.log(" ==== realper width ",realPerWidth,perWidth,len);
    const arr = [];
    for(let i=0; i<len; i++){
      arr.push(i);
    }
    return (
      <View style={[{...this.props.style},{width,flexDirection: 'row'}]}>
        {
          arr.map((item, index)=>{
            return (
              <Text
                style={[
                  {
                    backgroundColor: '#E6EAF2',
                    height: 10,
                  },
                  {...this.props.lineStyle},
                  {
                    flex: 1,
                    marginLeft: index == 0 ? 0 : perWidth/2,
                    marginRight: index == (len-1) ? 0 : perWidth/2,
                    width: perWidth,
                  }
                ]}
                key={'dash'+index}> </Text>
            )
          })
        }
      </View>
    )
  }
}
