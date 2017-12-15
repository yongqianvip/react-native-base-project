'use strict'

import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image,
	Animated,
	TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
const { width, height } = Dimensions.get('window')
import * as COLOR from '../constant/colors'

class FoldView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showHeight: new Animated.Value(0),
			iconRotation: new Animated.Value(0),
			opening: true,
		};
	}

	componentDidMount() {
		const { openHeight } = this.props;
		const { opening } = this.state;
		Animated.parallel([
			Animated.timing(this.state.showHeight, {
				toValue: opening ? 1 : 0,
				duration: 300,
			}),
			Animated.timing(this.state.iconRotation, {
				toValue: opening ? 1 : 0,
				duration: 300,
			}),
		]).start()
	}

	_headerClick() {
		const { dispatch, openHeight } = this.props;
		const { opening, showHeight, iconRotation } = this.state;
		Animated.parallel([
			Animated.timing(showHeight, {
				toValue: opening ? 0 : 1,
				duration: 300,
			}),
			Animated.timing(iconRotation, {
				toValue: opening ? 0 : 1,
				duration: 300,
			}),
		]).start(
			this.setState({
				opening: !opening
			})
			)
	}
	_viewLayOut(event) {
		const { dispatch, openHeight } = this.props;

	}
	render() {
		const { openHeight, renderContent, title, style } = this.props;
		const itemContent = renderContent ? renderContent() : null
		const { showHeight, iconRotation, opening } = this.state;
		return (
			<View style={styles.container}>
				<TouchableOpacity activeOpacity={0.8} onPress={() => {
					this._headerClick()
				}}>
					<View style={[styles.topView, style]}>
						<View style={{flex: 1}}>
							<Text>{title}</Text>
						</View>
						<View style={styles.arrowIconView}>
							<Animated.Text style={[styles.arrowIcon, {
								transform: [
									{
										rotate: this.state.iconRotation.interpolate({
											inputRange: [0, 1],
											outputRange: ['0deg', '-180deg']
										})
									}
								]
							}]}>&#xe616;</Animated.Text>
						</View>
					</View>
				</TouchableOpacity>
				<Animated.View removeClippedSubviews={false} style={[styles.contentView,{height: this.state.showHeight.interpolate({
					inputRange: [0,1],
					outputRange: [0, openHeight]
				})}]}>
					{openHeight > 0 ? this.props.children : ( opening ? this.props.children : null)}
				</Animated.View>

			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	topView: {
		height: 40,
		flex: 1,
		flexDirection: 'row',
		backgroundColor: COLOR.APP_CONTENT_BACKBG,
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: COLOR.LINE_COLOR
	},
	arrowIcon: {
		fontFamily: 'iconfont',
	},
	arrowIconView: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ccc',
		width: 20,
		height: 20
	},
	contentView: {
		flex: 1,
		backgroundColor: 'white',
		overflow: 'hidden'
	}
})

FoldView.propTypes = {
	title: PropTypes.string.isRequired,
}

export default FoldView

