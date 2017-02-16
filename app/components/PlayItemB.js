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

class PlayItemB extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={ styles.container }>
                <Text>Welcome!. Item B</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        height: 40,
    }
})

export default PlayItemB
