import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Image
} from 'react-native'
const { width, height } = Dimensions.get('window')

class ProductCell extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		const {rowData, rowID, goToDetail} = this.props;
		return (
			<TouchableOpacity activeOpacity={0.7} onPress={ () => goToDetail(rowData) } >
				<View style={ styles.cellContiner }>
					<Image style={ styles.image } source={{uri: `https:${rowData.imagePath}`}}/>
					<View style={ styles.textPart }>
						<Text style={ styles.productName }>({ rowID - 0 + 1 }).{ rowData.productName }</Text>
						<Text style={ styles.companyName }>{ rowData.companyName }</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	cellContiner: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 5,
		marginBottom: 5,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderTopColor: '#EEE9E9',
		borderBottomColor: '#EEE9E9',
		backgroundColor: 'white',
		alignItems: 'center',
	},
	image: {
		width: 90,
		height: 90,
		marginLeft: 8,
	},
	textPart: {
		marginLeft: 8,
		marginTop: 8,
		width: width - 90 - 24,
	},
	productName: {
		fontWeight: 'bold',
		fontSize: 16.0,
		color: 'black',
	},
	companyName: {
		marginTop: 8,
		fontSize: 14.0,
		color: 'gray',
	},

})

ProductCell.propTypes = {
	goToDetail: React.PropTypes.func.isRequired,

}

export default ProductCell