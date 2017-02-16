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
const { width, height } = Dimensions.get('window')

class PlayItemA extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={ styles.container }>
                <Text> Item A</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 40,
        width
    },

})

export default PlayItemA
