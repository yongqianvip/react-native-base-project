import React, { Component } from 'react'
import {
	StyleSheet,
	Dimensions,
	Text,
	TouchableOpacity,
	View,
	ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import NavigationBar from '../common/NavBarCommon.js'
const { width, height } = Dimensions.get('window')

import PickerViewContainer from './PickerViewContainer.js'
import AnimationViewContanier from './AnimationViewContanier.js'
import PlayCardContainer from './PlayCardContainer.js'
import PanGestureContainer from './PanGestureContainer.js'
import LocationContainer from './LocationContainer.js'
import InputTestContainer from './InputTestContainer.js'
import SliderContainer from './SliderContainer.js'
class PlaygroundContainer extends Component {

	constructor(props) {
	 	super(props);
	 	this.state = {
	 		visible: false
	 	}
	}

	componentDidMount() {

	}

	_imageClick() {
		const visible = this.state.visible;
		this.setState({
			visible: true
		});
	}

	_pushToNext(index) {
		const { navigator } = this.props;
		if(navigator) {
			switch(index){
				case 1:
					navigator.push({
					    component: PickerViewContainer,
					})
					break;
				case 2:
					navigator.push({
					    component: AnimationViewContanier,
					})
					break;
				case 3:
					navigator.push({
					    component: PlayCardContainer,
					})
					break;
				case 4:
					navigator.push({
					    component: PanGestureContainer,
					})
					break;
				case 5:
					navigator.push({
					    component: LocationContainer,
					})
					break;
				case 6:
					navigator.push({
					    component: InputTestContainer,
					})
					break;
				case 7:
					navigator.push({
					    component: SliderContainer,
					})
					break;
				default:

			}
		}
	}

	render() {

		return (
			<View>
				<NavigationBar title={'PLAY GROUND'} />
				<ScrollView style={ styles.scrollView }>
					<TouchableOpacity onPress={ this._pushToNext.bind(this, 1) }>
						<View style={ styles.itemView }>
							<Text>PickerView三级联动</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={ this._pushToNext.bind(this, 2) }>
						<View style={ styles.itemView }>
							<Text>动画</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={ this._pushToNext.bind(this, 3) }>
						<View style={ styles.itemView }>
							<Text>卡片折叠</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={ this._pushToNext.bind(this, 4) }>
						<View style={ styles.itemView }>
							<Text>手势</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={ this._pushToNext.bind(this, 5) }>
						<View style={ styles.itemView }>
							<Text>定位</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={ this._pushToNext.bind(this, 6) }>
						<View style={ styles.itemView }>
							<Text>INPUT</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={ this._pushToNext.bind(this, 7) }>
						<View style={ styles.itemView }>
							<Text>侧拉</Text>
						</View>
					</TouchableOpacity>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	scrollView: {
		height: height - 64 - 49,
		backgroundColor: '#FFEFDB'
	},
	itemView: {
		borderColor: 'lightgray',
		borderWidth: 0.5,
		height: 44,
		justifyContent: 'center',
		alignItems: 'center',
	},

})


function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(PlaygroundContainer);




