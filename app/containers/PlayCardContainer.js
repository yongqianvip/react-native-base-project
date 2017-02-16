import React, { Component } from 'react'
import {
	StyleSheet,
	ScrollView,
	Dimensions,
	Animated,
	View,
	Platform
} from 'react-native'
import { connect } from 'react-redux'
import NavigationBar from '../common/NavBarCommon.js'
import PlayItem from '../components/PlayItem.js'
const { width, height } = Dimensions.get('window')
import backIcon from '../../localSource/images/back.png'
import loadingImage from '../../assets/0.gif'

class PlaygroundContainer extends Component {

	constructor(props) {
		super(props);
	}
	_backToFront() {
		const { navigator } = this.props;
		if (navigator) {
			navigator.pop();
		};
	}

	render() {
		const itemsArray = [100,60,140,180];
		const playItems = itemsArray.map((item,index) => {
			return <PlayItem
						keyIndex={index}
						key={index}
						openHeight={ item }
						{ ...this.props } />
		})
		return (
			<View style={ styles.containerView }>
				<NavigationBar title={'Animation'} leftImage={ backIcon } leftAction={ this._backToFront.bind(this) }/>
				<ScrollView style={ styles.scroll }>
					{playItems}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	containerView : {
		backgroundColor: 'white'
	},
    scroll: {
    	height: height - (Platform.OS === 'ios' ? 64 : 44),
    }
})


function mapStateToProps(state) {
	const {
		playReducer
	} = state;

	return playReducer;
}

export default connect(mapStateToProps)(PlaygroundContainer);