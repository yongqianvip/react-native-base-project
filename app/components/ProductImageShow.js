
import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	NativeModules,
} from 'react-native'
import holderImage from '../../localSource/images/tree.png'
import NavigationBar from '../common/NavBarCommon.js'
import backIcon from '../../localSource/images/back.png'
import ProductDetailContainer from '../containers/ProductDetailContainer.js'

const {height, width} = Dimensions.get('window');

class ProductImageShow extends Component {

	constructor(props) {
		super(props);
		this.state = {
			navOpacity: 0
		}
	}
	_backToFront() {
		const { navigator } = this.props;
		if(navigator) {
			navigator.pop();
		}
	}

	_toast() {
		// showMessage('提示信息内容','显示时长1~5秒','位置['top','center','bottom']')
		NativeModules.NativeToast.showMessage(
			`提示信息\n可以控制显示的时间\nshowTime:[1~5]\n可以控制提示信息显示的位置\nposition:['top','center','bottom']`,
			5,
			'center'
		)
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
				<TouchableOpacity onPress={ this._toAnotherDetail.bind(this) }>
					<Image style={ styles.image } source={{uri: `https:${this.props.rowData.imagePath.replace(/140x140/, `${2 * width}x${2 * width}`)}` }}/>
				</TouchableOpacity>
				<TouchableOpacity onPress={ this._toast.bind(this) }>
					<View style={ styles.bottomTitleView }>
						<Text style={ styles.bottomTitle }>点击图片可以去图文详情页</Text>
					</View>
				</TouchableOpacity>
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
		margin: 40,
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
	}

})

export default ProductImageShow
