import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TextInput,
} from 'react-native';
const { width, height } = Dimensions.get('window')

class SearchBar extends Component{

	constructor(props) {
		super(props);
		this.state = {
			text: ''
		}
	}

	render() {
		return (
			<View style={styles.searchBar} >
				<View style={ styles.searchField } >
					<TextInput style={ styles.textInput } onChangeText={(text) => this.setState({text})} value={ this.state.text } placeholder={'搜索关键字'} placeholderTextColor={ 'lightgray' }/>
					<View style={styles.bottomLine}/>
				</View>
				<View style={ styles.searchBtn} >
					<Text style={{ color: 'black', fontFamily:'iconfont',fontSize: 25,marginRight: 0 }}>&#xe609;</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	searchBar: {
		backgroundColor: 'white',
		height: 40,
		flexDirection: 'row'
	},
	searchField: {
		width: width-44,
		height: 34,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	textInput: {
		width: width - 44 - 16,
		height: 35,
		marginLeft: 8,
		marginRight: 8,
	},
	bottomLine: {
		width: width - 44 - 16,
		height: 1,
		backgroundColor: 'lightgray',
	},
	searchBtn: {
		width:44,
		height:40,
		justifyContent:'center',
		alignItems: 'center'
	}
})

export default SearchBar
