import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import NavigationBar from '../common/NavBarCommon.js'
import backIcon from '../../localSource/images/back.png'

const { width, height } = Dimensions.get('window')

class More extends Component {
    constructor(props) {
        super(props);
    }

    _backToFront() {
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }
    
    render() {
        return (
            <View>
                <NavigationBar title={'更多'} leftImage={ backIcon } leftAction={ this._backToFront.bind(this) }/>
                <View style={ styles.footer }>
                    <Text style={styles.footerTitle}>{ this.props.keyWords }</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFEFDB',
        height: height - 64,
    },
    footerTitle: {
        marginLeft: 10,
        fontSize: 15,
        color: 'gray'
    }
})

export default More