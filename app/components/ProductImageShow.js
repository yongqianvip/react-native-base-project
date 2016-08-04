
import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
} from 'react-native'
import holderImage from '../../localSource/images/tree.png'
import NavigationBar from '../common/NavBarCommon.js'
import backIcon from '../../localSource/images/back.png'
import ProductDetailContainer from '../containers/ProductDetailContainer.js'

const {height, width} = Dimensions.get('window');

class ProductImageShow extends Component {

	constructor(props) {
		super(props);
		const { navigator,imageUrl } = this.props;
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

	_toAnotherDetail() {
		console.log("----<<<>>>>");
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
				<View style={{ marginTop: 20, height: 44, flexDirection:'column', alignItems: 'center' }}>
					<Text style={{ fontWeight:'bold' }}>点击图片可以去图文详情页</Text>
				</View>
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

})

export default ProductImageShow
