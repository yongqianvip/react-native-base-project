
import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
} from 'react-native'

class ProductDetail extends Component {

	constructor(props) {
		super(props);
	}

	_backToFront() {
		const { navigator } = this.props;
		if(navigator) {
			navigator.pop();
		}
	}

	render() {
		return (
			<TouchableOpacity onPress={ this._backToFront.bind(this) }>
				<Image style={{height: 100, width:100}} source={{uri: 'https://sc01.alicdn.com/kf/HTB1RKz6KVXXXXcWXFXXq6xXFXXXW/plastic-tool-box-and-hard-case-with.jpg_300x300xz.jpg'}}/>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	listViewContent: {
		flex: 1,
		paddingTop: 5,
		paddingBottom: 20,
		marginBottom: 0,
		backgroundColor: '#FFEFDB',
	}
})

export default ProductDetail
