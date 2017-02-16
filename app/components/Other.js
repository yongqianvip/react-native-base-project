
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ListView,
    Image,
    NativeModules,
    TouchableOpacity,
    Platform,
} from 'react-native';
import NavigationBar from '../common/NavBarCommon.js'
import MoreContainer from '../containers/MoreContainer.js'
import Storage from '../common/Storage.js'
import Swiper from 'react-native-swiper'

const { width, height } = Dimensions.get('window')

const serviceItems = ['浏览记录','设置','协议','关于我','联系我们', '等等'];

const bannerList =[{
        imagePath: 'http://img11.360buyimg.com/da/jfs/t3133/13/1187355432/100517/8f96edab/57c7ded9Nb733c41c.jpg',
        title: 'banner No.1'
    },
    {
        imagePath: 'http://img12.360buyimg.com/da/jfs/t3202/110/1236085662/67021/52ba6393/57c82bfcNb5183dc1.jpg',
        title: 'banner No.2'
    },
    {
        imagePath: 'http://img11.360buyimg.com/da/jfs/t3091/94/988079468/94834/f1928e61/57c403afNa1c3008e.jpg',
        title: 'banner No.3'
    }
]

class Other extends Component {
    constructor(props) {
        super(props);
    }

    _cellClick(rowID) {
        const { navigator } = this.props;
        if(navigator) {
            if (rowID === '0') {
                navigator.push({
                    component: MoreContainer,
                    params: {
                        keyWords: '你好，我是更多。。。。。。'
                    }
                })
            } else if (rowID == '1') {
                if (Platform.OS === 'ios') {
                    NativeModules.ImagePicker.showAndGetImagePathWithCamOrLab('CAM',(error,event) => {
                        if (error) {
                            console.log("get image path error ");
                        } else {
                            console.log("get image path ",event.filePath);
                        }
                    })
                };
            }

            else {
                if (Platform.OS === 'ios') {
                    NativeModules.NativeToast.showMessage(
                        `${ serviceItems[rowID] }`
                    )
                };
            }
        }
    }

    render() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        return (
            <View>
                <NavigationBar title={'其他'} />
                <HeaderBanner bannerList={bannerList}/>
                <ListView style={ styles.listViewContent }
                    dataSource={ ds.cloneWithRows(serviceItems) }
                    renderRow={ (rowData,SectionId,rowID)=> {
                            return <Cell rowData={rowData} rowID={ rowID } cellClick={ this._cellClick.bind(this,rowID) }/>
                        }
                    }
                    contentContainerStyle={styles.list}/>
            </View>
        )
    }
}


class Cell extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {rowData, rowID, cellClick} = this.props;
        return (
            <View style={ styles.cellContiner }>
                <TouchableOpacity onPress={ () => cellClick(rowData) } >
                    <View style={styles.textContent}>
                        <Text>{ rowData }</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}


class HeaderBanner extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.bannerList === nextProps.bannerList) {
            console.log("---------b----------- AAAAAAAAAAAAAAA ----------");
            return false;
        };
    }

    constructor(props) {
        super(props);
    }

    render() {
        const bannerList = this.props.bannerList;
        console.log("---------c------ ----- AAAAAAAAAAAAAAA ----------");
        return (
            <Swiper style={styles.wrapper}
                height={200}
                paginationStyle={{
                    bottom: 5, left: null, right: 10,
                }}
                autoplay={true}
                autoplayTimeout={2}
                >
                {
                    (() => {
                        if (bannerList.length > 0) {
                            return bannerList.map((banner,index) => {
                                return (
                                    <View key={index} style={styles.slide}>
                                        <Image style={styles.image} source={{ uri: banner.imagePath}} />
                                    </View>
                                )
                            })
                        }
                    })()
                }
            </Swiper>
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
    },
    listViewContent: {
        height: height - 64 - 49,
    },
    cellContiner: {
        height: width/4,
        width: width/4,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'green',
        margin: 2,
    },
    list: {
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection:'row'
    },
    textContent: {
        height: width/4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cellBottomLine: {
        height: 1,
        marginLeft: 8,
        backgroundColor: 'lightgray',
    },
    wrapper: {
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    image: {
        flex: 1,
    }
})

export default Other