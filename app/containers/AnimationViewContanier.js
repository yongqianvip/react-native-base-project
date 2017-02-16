import React, { Component } from 'react'
import {
	StyleSheet,
	ScrollView,
	Dimensions,
	TouchableOpacity,
	Animated,
	View,
	Text,
	Platform,
} from 'react-native'
import { connect } from 'react-redux'
import NavigationBar from '../common/NavBarCommon.js'
const { width, height } = Dimensions.get('window')
import backIcon from '../../localSource/images/back.png'
import loadingImage from '../../assets/0.gif'

class PlaygroundContainer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			left1: new Animated.Value(0),
			rotation2: new Animated.Value(0),
			left3: new Animated.Value(0),
			rotation3: new Animated.Value(0),
			scale3: new Animated.Value(0.5),
			decayLeft4: new Animated.Value(0),
			left5: new Animated.Value(0),
		}
	}
	_backToFront() {
		const { navigator } = this.props;
		if (navigator) {
			navigator.pop();
		};
	}

	componentDidMount() {

	}
	_action1() {
		// 图片1 的弹跳动画
		console.log("_action1 ",this.state.left1);
		Animated.spring(this.state.left1, {
			toValue: this.state.left1._value > 0 ? 0 : width - 100,
			friction: 1,	//摩擦力
			tension: 100,	//张力 拉力
		}).start();
	}

	_action2() {
		// 图片2 的翻转动画
		Animated.timing(this.state.rotation2, {
			toValue: this.state.rotation2._value > 0 ? 0 : 1,
			duration: 3000,
		}).start();
	}
	// 组合动画
	_action3() {
		if (this.state.left3._value < 1) {
			// 以下两个动画将按顺序执行
			Animated.sequence([
				// 先执行 滚动，同时旋转
				Animated.parallel([
					Animated.timing(this.state.left3, {
						toValue: 1,
						duration: 3000,
					}),
					Animated.timing(this.state.rotation3, {
						toValue: 1,
						duration: 1000,
					}),
				]),
				// 再执行缩放
				Animated.timing(this.state.scale3, {
					toValue: 1,
					duration: 500,
				})
			]).start()
		}else{
			//
			const animations = [this.state.scale3,this.state.rotation3,this.state.left3].map((item,index)=>{
				return Animated.timing(item, {
					toValue: index == 0 ? 0.5 : 0,// scale3 设置为0的话 图片就缩放到看不见了
					duration: 500,
				})
			})
			Animated.parallel(animations).start()
		}
	}

	_action4() {
		Animated.decay(this.state.decayLeft4, {
			velocity: this.state.decayLeft4._value > 100 ? -2 : 2,	// 起始速度，必填参数。
			deceleration:0.992 	//速度衰减比例，默认为0.997。
		}).start();
	}

	_action5() {
		Animated.sequence([
			// 1000 ms后执行
			Animated.delay(1000),
			Animated.timing(this.state.left5, {
				toValue: this.state.left5._value > 0 ? 0 : width-100,	// 起始速度，必填参数。
				duration: 1000
			})
		]).start()
	}
	render() {

		return (
			<View style={ styles.containerView }>
				<NavigationBar title={'Animation'} leftImage={ backIcon } leftAction={ this._backToFront.bind(this) }/>
				<ScrollView style={ styles.scroll }>
					<Text>↓↓↓↓弹跳 可以调节摩擦力和拉力</Text>
					<TouchableOpacity onPress={ this._action1.bind(this) } activeOpacity={0.9}>
						<Animated.Image
							style={[styles.image,{left: this.state.left1}]}
							source={ loadingImage }/>
					</TouchableOpacity>
					<Text>↓↓↓↓翻转</Text>
					<TouchableOpacity onPress={ this._action2.bind(this) } activeOpacity={0.9}>
						<Animated.Image
							style={[styles.image,{
								transform:[
									{
										rotateX: this.state.rotation2.interpolate({
											inputRange:[0,1],
											outputRange:['0deg','360deg']
										})
									}
								]
							}]}
							source={ loadingImage }/>
					</TouchableOpacity>
					<Text>↓↓↓↓点击下图，先执行滚动，同时旋转  滚动旋转都执行完后执行缩放</Text>
					<TouchableOpacity onPress={ this._action3.bind(this) } activeOpacity={0.9}>
						<Animated.Image
							style={[styles.image,{
								left: this.state.left3.interpolate({
									inputRange:[0,1],
									outputRange:[0, width - 100]
								}),
								transform:[
									{
										rotateZ: this.state.rotation3.interpolate({
											inputRange:[0,1],
											outputRange:['0deg','360deg']
										})
									},
									{
										rotateX: this.state.rotation3.interpolate({
											inputRange:[0,1],
											outputRange:['0deg','360deg']
										})
									},
									{
										scale: this.state.scale3
									}
								]
							}]}
							source={ loadingImage }/>
					</TouchableOpacity>
					<Text>↓↓↓↓点击下图执行减速动画</Text>
					<TouchableOpacity onPress={ this._action4.bind(this) } activeOpacity={0.9}>
						<Animated.Image
							style={[styles.image,{
								left: this.state.decayLeft4
							}]}
							source={ loadingImage }/>
					</TouchableOpacity>
					<Text>↓↓↓↓延时动画 1000 ms后执行</Text>
					<TouchableOpacity onPress={ this._action5.bind(this) } activeOpacity={0.9}>
						<Animated.Image
							style={[styles.image,{
								left: this.state.left5
							}]}
							source={ loadingImage }/>
					</TouchableOpacity>

				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	containerView : {
		backgroundColor: '#FFEFDB'
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 50,
		left: 120,
		transform:[{perspective: 0.3}]
	},
    scroll: {
    	height: height - (Platform.OS === 'ios' ? 64 : 44),
    }
})


function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(PlaygroundContainer);