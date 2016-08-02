import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    Alert,
} from 'react-native';

class NavigationBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
    	const {title} = this.props;

    	
        return (
            <View style={styles.barView}>
            	<View style={ styles.showView }>
		            {
		            	(()=>{
		            		if (title) {
		            			return <Text style={styles.title}>{this.props.title}</Text>
		            		}
		            	})()
		            }
		        </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    barView: {
        height: Platform.OS === 'android' ? 50 : 64,
        backgroundColor: '#4E78E7',
    },
    showView: {
    	flex: 1,
    	alignItems: 'center',
    	justifyContent: 'center',
    	flexDirection: 'row',
    	marginTop: Platform.OS === 'android' ? 0 : 20,
    	height: 44,
    },
    title: {
    	color: 'white',
    	fontSize: 18.0,
    }
    
})



export default NavigationBar