import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ListView,
    Image,
    Animated,
    Easing,
    TouchableOpacity,
} from 'react-native';
const { width, height } = Dimensions.get('window')
import{
    changePlayItemShowIndex
} from '../action/playItem.js'
import PlayItemA from './PlayItemA.js'
import PlayItemB from './PlayItemB.js'
import PlayItemC from './PlayItemC.js'

class PlayItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showHeight: new Animated.Value(0),
        };
    }

    _headerClick() {
        const { keyIndex, dispatch } = this.props;
        dispatch(changePlayItemShowIndex(keyIndex));

    }
    _viewLayOut(event) {
        // console.log("view layout event ",event.nativeEvent);
    }
    render() {

        const { showingIndex, openHeight, keyIndex } = this.props;
        const opening = showingIndex == keyIndex;
        let itemContent;
        let title;
        switch(keyIndex){
            case 0:
                itemContent = <PlayItemA />;
                title = 'PlayItemA';
                break;
            case 1:
                itemContent = <PlayItemB />;
                title = 'PlayItemB';
                break;
            default:
                itemContent = <PlayItemC/>;
                title = 'PlayItemC';
        }

        Animated.timing(this.state.showHeight,{
            toValue: opening ? openHeight : 0,
            duration: 500
        }).start();

        return (
            <View style={ styles.container }>
                <TouchableOpacity activeOpacity={0.7} onPress={ this._headerClick.bind(this) }>
                    <View style={ styles.main }>
                        <Text>{ title }</Text>
                        <Text>{ opening ? '↑' : '↓'}</Text>
                    </View>
                </TouchableOpacity>
                <Animated.View
                    onLayout={ this._viewLayOut.bind(this) }
                    style={
                        [
                            styles.main2,
                            {
                                height: this.state.showHeight
                            }
                        ]
                    }>
                    { itemContent }
                </Animated.View>
            </View>
        )
    }
}
// opening ? openHeight : 0
const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'gray',
    },
    main: {
        alignItems: 'center',
        height: 44,
        width,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1
    },
    main2: {
        alignItems: 'center',
        width,
        overflow: 'hidden',
        backgroundColor: 'lightgray'
    },
})

export default PlayItem
