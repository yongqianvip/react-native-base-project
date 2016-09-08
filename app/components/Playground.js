import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ListView,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    getViewRecords
} from '../action/product.js'
import NavigationBar from '../common/NavBarCommon.js'
import backIcon from '../../localSource/images/back.png'
import Storage from '../common/Storage.js'
const { width, height } = Dimensions.get('window')

class Playground extends Component {
    constructor(props) {
        super(props);
    }

    
    render() {
        const { reducer } = this.props;
        return (
            <View style={ styles.container }>
                <NavigationBar title={'Playground'} />
                <View style={ styles.main }>
                    <Text style={ styles.content }>Welcome! Enjoy yourself at home.</Text>
                </View>
            </View>
        )
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFEFDB',

    },
    main: {
        alignItems: 'center',
        
    },
    content: {
    }
    
})

export default Playground