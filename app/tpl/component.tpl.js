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

class ComponentTpl extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { reducer } = this.props;
        return (
            <View style={ styles.container }>
                <View style={ styles.main }>
                    <Text style={ styles.content }>Welcome! Make yourself at home.</Text>
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

export default ComponentTpl
