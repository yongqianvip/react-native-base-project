import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Animated,
    Text,
    TouchableHighlight
} from 'react-native';
const { width, height } = Dimensions.get('window')
const sliderWidth = 200;

class SliderFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left: new Animated.Value(width),
        }
    }
    componentDidMount() {
        Animated.spring(this.state.left, {
            toValue: width-sliderWidth,
            friction: 6,
            tension: 10,
        }).start();

        // Animated.decay(this.state.left, {
        //     velocity: -1,
        //     deceleration:0.992  //速度衰减比例，默认为0.997。
        // }).start();
    }

    _hideSilder() {
        console.log("click alpha view and hide filter ");
        Animated.spring(this.state.left, {
            toValue: width,
            friction: 6,
            tension: 10,
        }).start();
        setTimeout(()=>{
            this.props.touchClose()
        },400);

    }
    render() {
        return (
            <View style={{backgroundColor: 'rgba(0, 0, 0, 0.4)',flex: 1}}>
            	<TouchableHighlight onPress={ this._hideSilder.bind(this)} activeOpacity={ 0.9 }>
    	            <View style={{width,height,position:'absolute'}} >
    	            </View>
    	        </TouchableHighlight>
                <Animated.View style={{top: 0,left: this.state.left,width: sliderWidth,height: height,backgroundColor:'orange'}}>
                    <Text style={{top: 100}}>筛选筛选筛选筛选筛选筛选筛选</Text>
                </Animated.View>
            </View>
        )
    }
}

SliderFilter.propTypes = {

}
export default SliderFilter
