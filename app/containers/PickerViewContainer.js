import React, { Component } from 'react'
import {
	StyleSheet,
	Dimensions,
	Animated,
	Image,
	TouchableOpacity,
	Modal,
	Text,
	View
} from 'react-native'
import { connect } from 'react-redux'
import NavigationBar from '../common/NavBarCommon.js'
const { width, height } = Dimensions.get('window')
import loadingImage from '../../assets/0.gif'
import AddressPicker from '../components/AddressPicker.js'
import backIcon from '../../localSource/images/back.png'

class PickerViewContainer extends Component {

	constructor(props) {
	 	super(props);
	 	this.state = {
	 		visible: false,
	 		selectedAddress: '请选择地址'
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

	_backToFront() {
		const { navigator } = this.props;
		if (navigator) {
			navigator.pop();
		};
	}

	render() {
		return (
			<View style={ styles.containerView }>
				<NavigationBar title={'PickerView'} leftImage={ backIcon } leftAction={ this._backToFront.bind(this) }/>

				<TouchableOpacity onPress={ this._imageClick.bind(this) }>
					<View style={ styles.addressView }>
						<Text>{ this.state.selectedAddress }</Text>
					</View>
				</TouchableOpacity>
				<Modal onRequestClose={()=>{}} animationType={ "fade" } transparent={true} visible={this.state.visible}>
					<AddressPicker
						sureAndCloseWithResult={(value) => {
							const selectedAddress = `${value.provience}${value.city}${value.district}`;
							this.setState({
								visible: false,
								selectedAddress: selectedAddress
							})
							console.log("======== ",value);
						}}
						cancle={()=>{
							this.setState({
								visible: false
							})
						}}
					/>
				</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	containerView: {
		flex: 1,
		backgroundColor: 'white'
	},
	addressView: {
		height: 44,
		backgroundColor: 'lightgray',
		justifyContent: 'center',
		alignItems: 'center'
	},
	image: {
		width: 100,
		height: 80,
		left: 120,
	},
	pickerstyle: {
		flexDirection: 'row',
		backgroundColor: 'lightgray',
		overflow: 'hidden',
	},
	picker: {
		flex: 1,
		width: width/3,
	}
})


function mapStateToProps(state) {
	const {
		playReducer
	} = state;

	return playReducer;
}

export default connect(mapStateToProps)(PickerViewContainer);






















// 以下是卡片折叠的代码
//
// import React, { Component } from 'react'
// import {
// 	StyleSheet,
// 	ScrollView,
// 	Dimensions,
// 	View
// } from 'react-native'
// import { connect } from 'react-redux'
// import NavigationBar from '../common/NavBarCommon.js'
// import PlayItem from '../components/PlayItem.js'
// const { width, height } = Dimensions.get('window')


// class PlaygroundContainer extends Component {

// 	constructor(props) {
// 	  super(props);
// 	}

// 	render() {
// 		const itemsArray = [100,60,140,180];
// 		const playItems = itemsArray.map((item,index) => {
// 			return <PlayItem
// 						keyIndex={index}
// 						key={index}
// 						openHeight={ item }
// 						{ ...this.props } />
// 		})
// 		return (
// 			<View >
// 				<NavigationBar title={'PLAY BOY'} />
// 				<ScrollView style={ styles.scroll }>
// 					{playItems}
// 				</ScrollView>
// 			</View>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
//     scroll: {
//     	height: height - 49 - 64,
//     }
// })


// function mapStateToProps(state) {
// 	const {
// 		playReducer
// 	} = state;

// 	return playReducer;
// }

// export default connect(mapStateToProps)(PlaygroundContainer);