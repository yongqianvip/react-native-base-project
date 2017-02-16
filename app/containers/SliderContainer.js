import React, {
	Component,
} from 'react'
import {
	View,
	Modal
} from 'react-native'
import { connect } from 'react-redux'
import NavigationBar from '../common/NavBarCommon.js'
import backIcon from '../../localSource/images/back.png'
import SliderFilter from '../components/SliderFilter.js'

class SliderContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			silderVisiable: false
		}

	}

	_backToFront() {
		const { navigator } = this.props;
		if (navigator) {
			navigator.pop();
		};
	}

	_showSliser() {
		this.setState({
			silderVisiable: true
		})
	}

	_hideSilder() {
		this.setState({
			silderVisiable: false
		})
	}

	render() {
		const {silderVisiable} = this.state;
		return (
			<View style={{flex:1,backgroundColor: 'orange'}}>
				<NavigationBar leftImage={backIcon} leftAction={this._backToFront.bind(this)} rightTitle="筛选" rightAction={this._showSliser.bind(this)}/>
				<Modal animationType={ "fade" } transparent={true} visible={silderVisiable} onRequestClose={()=>{}} >
					<SliderFilter touchClose={ this._hideSilder.bind(this) }/>
				</Modal>
			</View>
		);
	}
}

function mapStateToProps(state) {
	const { userReducer } = state;
	return userReducer;
}

export default connect(mapStateToProps)(SliderContainer);