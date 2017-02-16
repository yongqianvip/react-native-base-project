import React, {
	Component,
} from 'react'
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	Modal
} from 'react-native'
import { connect } from 'react-redux'
import NavigationBar from '../common/NavBarCommon.js'
import backIcon from '../../localSource/images/back.png'
import Button from '../common/Button.js'
import {
	getAddressWithLocation,
	gotCurrentLocation,
	resetSelectedLocation,
} from '../action/location.js'
const { width, height } = Dimensions.get('window')
import CommonPicker from '../components/CommonPicker.js'
import Picker from 'react-native-picker';



class MoreContainer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			initialPosition: null,
			lastPosition: null,
			addressContent: '请选择',
			visible: false,
		}
	}

	_backToFront() {
		const { navigator } = this.props;
		if (navigator) {
			navigator.pop();
		};
	}

	componentDidMount() {

		this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
			console.log("watchPosition ----- > ",lastPosition);
			this.setState({lastPosition});
		});

	}

	_getCurrentLocation() {
		const { dispatch } = this.props;
		navigator.geolocation.getCurrentPosition(
			(currentPosition) => {
				this.setState({initialPosition: currentPosition})

				const { latitude, longitude } = currentPosition.coords;
				console.log("--------location ",currentPosition);
				console.log("----- wgs84 坐标 ",[longitude, latitude]);

				dispatch(getAddressWithLocation(longitude,latitude));
			},
			(error) => console.error(error),
			{
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			}
		);
	}

	componentWillUnmount() {
		console.log(" clean watch id :",this.watchID);
		navigator.geolocation.clearWatch(this.watchID);
		this.props.dispatch(resetSelectedLocation());
	}

	_addressPickerClick() {

		this.setState({
			visible: true
		});
	}

	render() {
		const { selectedLocationObj, dispatch } = this.props;
		console.log(" render run ");
		return (
			<View>
				<NavigationBar title={ "定位" } leftImage={ backIcon } leftAction={ this._backToFront.bind(this) }/>
				<View style={ styles.addressView }>
					<TouchableOpacity opacity={ 0.8 } onPress={ this._addressPickerClick.bind(this) }>
						<Text style={ styles.addressContent }>{
							selectedLocationObj ? `${selectedLocationObj.province}${selectedLocationObj.city}${selectedLocationObj.district}` : '请选择地址'
						}</Text>
					</TouchableOpacity>
					<Button style={ {width: 100,height: 40, margin: 2} } title={ "点击定位" } onClick={ this._getCurrentLocation.bind(this) }/>
				</View>
				<View style={ styles.detailAddress }>
					<Text style={ styles.detailAddressContent }>{selectedLocationObj ? selectedLocationObj.detailAddress : ''}</Text>
				</View>
				<Modal onRequestClose={()=>{}} animationType={ "fade" } transparent={true} visible={this.state.visible}>
					<CommonPicker onPickerConfirm={(data)=>{
						this.setState({visible: false});
						console.log(" LocationContainer.js log onPickerConfirm",data);
					}}
					onPickerCancel={(data)=>{
						this.setState({visible: false});
						console.log(" LocationContainer.js log onPickerCancel",data);
					}}
					onPickerSelect={(data)=>{

						console.log(" LocationContainer.js log onPickerSelect",data);
					}}/>
				</Modal>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	button: {
		height: 44,
		width: 100
	},
	addressView: {
		height: 60,
		width,
		flexDirection: 'row',
		backgroundColor: 'lightgray',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	addressContent: {
		marginLeft: 10,
		fontSize: 20,
		width: width - 120,
	},
	detailAddress: {
		height: 60,
		width,
		backgroundColor: 'orange',
		justifyContent: 'center'
	},
	detailAddressContent: {
		fontSize: 20,
		marginLeft: 10,
		width: width - 10,
	}
})


function mapStateToProps(state) {
	const { userReducer } = state;
	return userReducer;
}

export default connect(mapStateToProps)(MoreContainer);



// <Modal animationType={ "fade" } transparent={true} visible={this.state.visible}>
// 	<AddressPicker
// 		sureAndCloseWithResult={(value) => {
// 			dispatch(gotCurrentLocation(value))
// 			this.setState({
// 				visible: false,
// 			})
// 			console.log("======== ",value);
// 		}}
// 		cancle={()=>{
// 			this.setState({
// 				visible: false
// 			})
// 		}}
// 	/>
// </Modal>

// <Button style={ {width: 100,height: 40, margin: 2} } title={ "点击定位" } onClick={ this._getCurrentLocation.bind(this) }/>
// <Button style={ {width: 100,height: 40, margin: 2} } title={ '取消' } onClick={ this._getCurrentLocation.bind(this) }/>
// {
// 	this.state.initialPosition ?
// 	(<View>
// 		<View>
// 			<Text>【coords:】</Text>
// 			<Text>速度: </Text><Text>{ this.state.initialPosition.coords.speed }</Text>
// 			<Text>经度: </Text><Text>{ this.state.initialPosition.coords.longitude }</Text>
// 			<Text>纬度: </Text><Text>{ this.state.initialPosition.coords.latitude }</Text>
// 			<Text>海拔: </Text><Text>{ this.state.initialPosition.coords.altitude }</Text>
// 			<Text>高度准确度: </Text><Text>{ this.state.initialPosition.coords.altitudeAccuracy }</Text>
// 		</View>
// 		<View>
// 			<Text>【timestamp:】</Text>
// 			<Text>{ this.state.initialPosition.timestamp }</Text>
// 		</View>

// 	</View>)
// 	:
// 	null
// }
//
// {
// 	currentLocationObj ?
// 	(
// 		<View>
// 			<Text>省：{currentLocationObj.addressComponent.province}</Text>
// 			<Text>市：{currentLocationObj.addressComponent.city}</Text>
// 			<Text>区：{currentLocationObj.addressComponent.district}</Text>
// 		</View>
// 	)
// 	: null
// }