
import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	Animated,
	Easing,
	PanResponder,
	NativeModules,
} from 'react-native'
import holderImage from '../../localSource/images/tree.png'
import NavigationBar from '../common/NavBarCommon.js'
import backIcon from '../../localSource/images/back.png'
import ProductDetailContainer from '../containers/ProductDetailContainer.js'
import { ShowTabBar } from '../action/TabbarHandle.js'
import LoadingView from '../common/LoadingView.js'
const {height, width} = Dimensions.get('window');

class ProductImageShow extends Component {

	constructor(props) {
		super(props);
		this.state = {
			navOpacity: 0,
			showLoading: false,
			opacity: new Animated.Value(0),
		}
	}
	componentWillMount() {
		this._panResponder = PanResponder.create({
			// 要求成为响应者：
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

			onPanResponderGrant: (evt, gestureState) => {
				// 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
				console.log("开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！");
				// gestureState.{x,y}0 现在会被设置为0
			},
			onPanResponderMove: (evt, gestureState) => {
				// 最近一次的移动距离为gestureState.move{X,Y}
				console.log("最近一次的移动距离为gestureState.move{X,Y}",gestureState);
				// 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
			},
			onPanResponderTerminationRequest: (evt, gestureState) => true,
			onPanResponderRelease: (evt, gestureState) => {
				// 用户放开了所有的触摸点，且此时视图已经成为了响应者。
				// 一般来说这意味着一个手势操作已经成功完成。
				console.log("放开");
			},
			onPanResponderTerminate: (evt, gestureState) => {
				// 另一个组件已经成为了新的响应者，所以当前手势将被取消。
			},
			onShouldBlockNativeResponder: (evt, gestureState) => {
			 	// 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
				// 默认返回true。目前暂时只支持android。
				return true;
			},
	    });
	}

	componentDidMount() {
		this.state.opacity.setValue(1.0);

	}

	_imageAnimation() {
		Animated.timing(
		    this.state.opacity,
		    {
				toValue: 0.3,                         // 将其值以动画的形式改到一个较小值
				duration: 1000, // 动画时间
				delay: 3000,
				easing: Easing.linear
			}
		).start();
	}

	_backToFront() {
		const { dispatch } = this.props;
		dispatch(ShowTabBar(true));
		const { navigator } = this.props;
		if(navigator) {
			navigator.pop();
		}
	}

	_toast() {
		NativeModules.NativeToast.showMessage(
			`提示信息\n可以控制显示的时间\nshowTime:[1~5]\n可以控制提示信息显示的位置\nposition:['top','center','bottom']`,
			5,
			'center'
		)
	}

	_showLoading() {
		this.setState({
			showLoading: true
		})

		this._imageAnimation();
	}

	_closeLoading() {
		this.setState({
			showLoading: false
		})
	}

	_toAnotherDetail() {
		const { navigator, rowData } = this.props;
		if(navigator) {
			navigator.push({
			    component: ProductDetailContainer,
			    params: {
			    	rowData
			    }
			});
		}
	}

	render() {
		return (
			<View style={ styles.mainView }>
				<NavigationBar title={'图片详情'} leftImage={ backIcon } leftAction={ this._backToFront.bind(this) } rightTitle={'去看图文详情'} rightImage={ backIcon } rightAction={ this._toAnotherDetail.bind(this) } />
				<TouchableOpacity activeOpacity={0.9}  onPress={ this._toAnotherDetail.bind(this) }>
					<Animated.Image style={ [styles.image, {opacity: this.state.opacity}] } source={{uri: `https:${this.props.rowData.imagePath.replace(/140x140/, `${2 * width}x${2 * width}`)}` }} />
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.9} onPress={ this._toast.bind(this) }>
					<Animated.View style={ styles.bottomTitleView }>
						<Text style={ styles.bottomTitle }>点击图片可以去图文详情页</Text>
					</Animated.View>
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.9} onPress={ this._showLoading.bind(this) }>
					<View style={ styles.bottomTitleView }>
						<Text style={ styles.bottomTitle }>Show Loading</Text>
					</View>
				</TouchableOpacity>
				<View {...this._panResponder.panHandlers} style={ styles.panView } ></View>
				<LoadingView showLoading={ this.state.showLoading } closeLoading={ this._closeLoading.bind(this) } />
			</View>
		)
	}

}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		backgroundColor: '#FFEFDB',
	},
	image: {
		height: width,
		width,
	},
	bottomTitleView: {
		margin: 20,
		height: 44,
		flexDirection:'column',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: 'blue',
	},
	bottomTitle: {
		fontWeight:'bold',
		color:'red',
	},
	panView: {
		backgroundColor: 'green',
		width: 100,
		height: 50
	}

})

export default ProductImageShow
