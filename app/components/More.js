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

class More extends Component {
    constructor(props) {
        super(props);
    }

    // componentWillMount() {
    //     Storage.getValueForKey('lastestRecord').then((value)=>{
    //         console.log("+++++++++++++++++++++++++++ ",value);
    //     });
    // }

    componentDidMount() {
        this.props.dispatch(getViewRecords('lastestRecord'));
    }

    _backToFront() {
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }
    _renderRow(rowData,SectionId,rowID) {
        return <RecordCell rowData={ rowData } rowID={ rowID } />
    }

    render() {
        // const { userReducer } = this.props;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return (
            <View>
                <NavigationBar title={'浏览记录'} leftImage={ backIcon } leftAction={ this._backToFront.bind(this) }/>
                <ListView
                    style={ styles.listViewContent }
                    dataSource={ ds.cloneWithRows(this.props.viewRecord) }
                    renderRow={ this._renderRow.bind(this) }
                    enableEmptySections={ true }/>
            </View>
        )
    }
}

class RecordCell extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { rowData } = this.props;
        return (
            <View style={styles.recordCell}>
                <View style={styles.cellContent}>
                    <Image style={ styles.image } source={{uri: `https:${rowData.imagePath}`}}/>
                    <View style={ styles.textContent }>
                        <Text style={ styles.id }>{ rowData.id }</Text>
                        <Text>{ rowData.name }</Text>
                    </View>
                </View>
                <View style={styles.bottomLine}/>
            </View>
        );
    }
}




const styles = StyleSheet.create({
    listViewContent: {
        backgroundColor: '#FFEFDB',
        height: height - 64,
    },
    recordCell: {
        height: 80
    },
    cellContent: {
        height: 80 - 1,
        marginLeft: 10,
        flexDirection: 'row',
    },
    image: {
        margin: 3,
        width: 80 - 6,
    },
    textContent: {
        margin: 0,
        width: width - (80 - 6) - 10 - 6,
        justifyContent: 'center'
    },
    id: {
        fontWeight: 'bold',
        height: 30,
    },
    bottomLine: {
        height: 1,
        backgroundColor: 'lightgray',
        marginLeft: 8,
    }

})

export default More