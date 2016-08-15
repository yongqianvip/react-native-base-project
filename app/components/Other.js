import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import NavigationBar from '../common/NavBarCommon.js'
import MoreContainer from '../containers/MoreContainer.js'

const { width, height } = Dimensions.get('window')


class Other extends Component {
    constructor(props) {
        super(props);
    }

    _toShowMore() {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                component: MoreContainer,
                params: {
                    keyWords: '你好，我是更多。。。。。。'
                }
            })
        }
    }

    render() {
        return (
            <View>
                <NavigationBar title={'其他'} />
                <View style={ styles.footer }>
                    <TouchableOpacity onPress={ this._toShowMore.bind(this) }>
                        <Text style={styles.footerTitle}>{'点我查看更多'}</Text>
                    </TouchableOpacity>
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
        height: height - 64 - 49,
    },
    footerTitle: {
        marginLeft: 10,
        fontSize: 15,
        color: 'gray'
    }
})

export default Other