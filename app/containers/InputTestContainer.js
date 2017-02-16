import React, {
	Component,
} from 'react'
import {
	View,
	StyleSheet,
	TextInput
} from 'react-native'
import { connect } from 'react-redux'
import NavigationBar from '../common/NavBarCommon.js'
import backIcon from '../../localSource/images/back.png'

class InputTestContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text1: '',
			text2: '这是 text2 不可编辑'
		};
	}
	_backToFront() {
		const { navigator } = this.props;
		if (navigator) {
			navigator.pop();
		};
	}

	_rightAction() {
		console.log(" _rightAction action ");
	}
	componentDidMount() {
		console.log("this.state. ", this.state.text1);
	}

	render() {
		return (
			<View style={ styles.container }>
				<NavigationBar title={ "Input" } leftImage={ backIcon } leftAction={ this._backToFront.bind(this) } rightTitle={ "筛选" } rightAction={ this._rightAction.bind(this)}/>
				<View style={ styles.inputView }>
					<TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
						onChangeText={(text1) => this.setState({text1})}
						onBlur={()=>{
							const tt = this.state.text1;
							this.setState({text1: tt.toUpperCase()})
						}}
						autoCapitalize="characters"
						value={this.state.text1}/>
					<TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
						onChangeText={(text2) => this.setState({text2})}
						value={this.state.text2}
						editable = {false}/>

				</View>
				<View style={styles.inputView}>
					<TextInput
						password={true}
						style={styles.textInputStyle}
						placeholder="none"
						autoCapitalize="none"
						onEndEditing={()=>{
							console.log("onEndEditing  ----");
						}}
						onBlur={()=>{
							console.log("onBlur  ----");
						}}/>
					<TextInput
						secureTextEntry={true}
						style={styles.textInputStyle}
						placeholder="sentences"
						autoCapitalize="sentences"/>
					<TextInput
						style={styles.textInputStyle}
						placeholder="words"
						autoCapitalize="words"/>
					<TextInput
						style={styles.textInputStyle}
						placeholder="characters"
						autoCapitalize="characters"/>
				</View>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'orange'
	},
	inputView: {

	},
	textInputStyle: {
		height: 44,
		width: 320,
	}
})

function mapStateToProps(state) {
	const { userReducer } = state;
	return userReducer;
}

export default connect(mapStateToProps)(InputTestContainer);