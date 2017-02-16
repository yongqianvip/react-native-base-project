import React, { Component } from 'react';
import {
	View,
	Image,
	StyleSheet,
	Dimensions,
	Text,
	TouchableOpacity
} from 'react-native';
const { width, height } = Dimensions.get('window')
import loadingImage from '../../assets/0.gif'

class Button extends Component{
	constructor(props) {
		super(props);
	}

	render() {
		const { image } = this.props
		return (
			<TouchableOpacity onPress={ this.props.onClick } opacity={ 0.8 }>
				<View style={ [styles.view, {...this.props.style}] }>
					{ image == undefined
						?
						<Text style={ styles.text }>{ this.props.title }</Text>
						:
						<Image source={ image }/>
					}
				</View>
			</TouchableOpacity>
		)
	}
}
const styles = StyleSheet.create({
	view: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: 'blue'
	},
	text: {
		color: 'blue',
		fontSize: 20
	}
})

export default Button
