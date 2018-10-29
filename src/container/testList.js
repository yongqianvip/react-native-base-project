
import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, SwipeRow, Button } from 'native-base';
import BackButton from '../common/backButton.js'
import PropTypes from 'prop-types';
import loadingImage from '../../assets/0.gif'
import { LargeList } from "react-native-largelist";

class TestListScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list: Array.of(),
      datasource: [...Array(100)].map(function(item, i) {
        return i + '' + item;
      })
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: '',
    headerLeft: (<BackButton navigation={navigation}/>)
  });
  componentDidMount() {
    // datasource
  }
  _keyExtractor = (item, index) => index

  render() {
    console.log('===? state,datasource',this.state.datasource);
    return (
      <Container style={{flexDirection: 'row'}}>
        <Content style={{flex: 1, backgroundColor: '#999'}}>
          {/* <FlatList
            style={{flex:1}}
            data={this.state.datasource}
            renderItem={(content)=>{
              console.log('----> ',content.item);
              return (
                <View style={{borderBottomColor:'red',borderBottomWidth: 1}}>
                  <Text>{content.item}</Text>
                  <Image source={ loadingImage } style={{width: 100, height: 60}}/>
                </View>
              )
            }}
            keyExtractor={this._keyExtractor}
            extraData={this.state}
            onEndReachedThreshold={0.1}
            enableEmptySections={true}/> */}
        </Content>
        <Content style={{flex: 1}}>
          <LargeList
            style={{ flex: 1, height: 500 }}
            bounces={true}
            refreshing={false}
            safeMargin={600}
            scrollEventThrottle={10}
            numberOfRowsInSection={section => 100}
            heightForCell={()=>100}
            renderCell={(section,content)=>{
              console.log('----> ',content);
              return (
                <View style={{borderBottomColor:'red',borderBottomWidth: 1}}>
                  <Text>{content}</Text>
                  <Image source={ loadingImage } style={{width: 100, height: 60}}/>
                </View>
              )
            }}
          />
        </Content>
      </Container>
    );
  }
  componentWillUnmount() {

  }
}

const styles = StyleSheet.create({

})

TestListScreen.propTypes = {

}
export default connect()(TestListScreen)








// import React, { Component } from 'react';
// import {
//   View,
//   StyleSheet,
//   Modal,
//   TouchableOpacity,
//   ImageBackground,
//   InteractionManager
// } from 'react-native';
// import Button from 'apsl-react-native-button';
// import { connect } from 'react-redux';
// import { ROUTE_STOCKING } from "../../constants/routeType";
// import NavigatorBar from '../../components/common/navigatorbar'
// import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
// import StockList from '../../components/stock/stockList';
// import {fetchData} from '../../action/app';
// import * as API from '../../constants/api';
// import {receiveStockBillList} from '../../action/stock';

// class StockScreen extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       tabIndex: 0,
//       showAll: true,
//       showDropMenu: false,
//     }
//     this._showDropMenu = this._showDropMenu.bind(this)
//     this._changeTab = this._changeTab.bind(this)
//   }

//   componentDidMount() {
//     /* 请求盘点单列表， 盘点状态checkStatus： 1 是新建 2是盘点中 3 差异待确认 4 是差异冻结中 5 是关闭 6 是取消 */
//     this._refreshList(0)
//   }
//   _showDropMenu() {
//     this.setState({
//       showDropMenu: !this.state.showDropMenu
//     })
//   }
//   _refreshList(tabIndex = this.state.tabIndex) {
//     // TODO:
//     console.log('do something to refresh list ', tabIndex)
//     this.props._requestStockBillList({
//       onlySelf: 0,
//       userId: this.props.userInfo.userId,
//       checkStatus: tabIndex === 0 ? '1' : (tabIndex === 1 ? '2' : (tabIndex === 2 ? '3' : '')),
//       pageNum: 0,
//       pageSize: 10,
//       warehouseCode: this.props.currentRepertory.warehouseCode
//     })
//   }
//   _loadMore(tabIndex = this.state.tabIndex) {
//     // TODO:
//     console.log('do something to load more ', tabIndex)
//   }
//   _changeTab(toTabIndex = 0){
//     const { stockToDo, stocking, stocked, navigation } = this.props
//     this.setState({
//       tabIndex: toTabIndex
//     })
//     const targetSource = [stockToDo, stocking, stocked][toTabIndex]
//     if (targetSource && targetSource.get('list').size < 1) {
//       this._refreshList(toTabIndex)
//     }
//   }
//   render() {
//     const { stockToDo, stocking, stocked, navigation } = this.props
//     const { showDropMenu } = this.state
//     return (
//       <View style={{flex: 1}}>
//         <NavigatorBar
//           router={navigation}
//           firstLevelIconFont={ this.state.showAll ? '全部' : '仅看自己'}
//           firstLevelIconFontStyle={{ fontSize: 16, color: '#333', width: 65, textAlign: 'center'}}
//           firstLevelClick={() => {
//             this._showDropMenu()
//           }} />
//         <ScrollableTabView
//           style={{ flex: 1, backgroundColor: '#f0f2f5' }}
//           renderTabBar={() =>
//             <DefaultTabBar style={{ height: 42, borderWidth: 1, borderBottomColor: '#e6eaf2', backgroundColor: '#fff' }}
//               tabStyle={{ paddingBottom: 2 }} />
//           }
//           onChangeTab={(obj)=>{
//             console.log('====================================');
//             console.log(obj);
//             console.log('====================================');
//             if (obj.i == obj.from) {
//               return
//             };
//             this._changeTab(obj.i)

//           }}
//           tabBarUnderlineStyle={{ backgroundColor: '#2587FA', height: 2, width: 44, marginLeft: (SCREEN_WIDTH * 0.333 - 44) * 0.5 }}
//           tabBarActiveTextColor={'#2587FA'}
//           tabBarInactiveTextColor={'#333'}
//           tabBarTextStyle={{ fontSize: 14 }}>
//           <StockList
//             type={0}
//             tabLabel={'待盘点'}
//             dataSource={stockToDo}
//             refreshList={this._refreshList.bind(this)}
//             loadMoreAction={this._loadMore.bind(this)}
//             getStockTask={({id, code}) => {
//               /* 领任务 */
//               this.props._takeStockTask({
//                 checkCode: id,
//                 warehouseCode: code
//               })
//               console.log('==== get task to stock , task id is', id)
//             }} />
//           <StockList
//             type={1}
//             tabLabel={'盘点中'}
//             dataSource={stocking}
//             refreshList={this._refreshList.bind(this)}
//             loadMoreAction={this._loadMore.bind(this)}
//             stockGoOn={(id) => {
//               this.props.navigation.dispatch({ type: 'push', routeName: ROUTE_STOCKING, params: { title: '盘点', taskID: id } })
//               console.log(' === go on stocking , task id is ', id)
//             }} />
//           <StockList
//             type={2}
//             tabLabel={'已盘完'}
//             dataSource={stocked}
//             refreshList={this._refreshList.bind(this)}
//             loadMoreAction={this._loadMore.bind(this)} />
//         </ScrollableTabView>
//         <Modal animationType={"fade"} transparent={true} visible={showDropMenu} onRequestClose={() => console.log('resolve warnning')} >
//           <View style={styles.modalView}>
//             <TouchableOpacity activeOpacity={1} onPress={() => {
//               this.setState({ showDropMenu: false })
//             }}>
//               <View style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH, alignItems: 'center' }}>
//                 <ImageBackground source={STATIC_IMAGE.Bubble} style={{width: 100, height: 100, position: 'absolute', top: DANGER_TOP + 44, right: 10}}>
//                   <View style={{flex: 1, padding: 10, paddingBottom: 0}}>
//                     <Button
//                       style={{ flex: 1, borderWidth: 0, marginBottom: 0}}
//                       textStyle={{fontSize: 16, color: '#333'}}
//                       onPress={()=>{
//                         this.setState({
//                           showDropMenu: false,
//                           showAll: true
//                         })
//                         this.props.navigation.setParams({showAll: true})
//                       }}>
//                       全部
//                     </Button>
//                     <View style={{height: MINI_LINE, backgroundColor: '#E8E8E8'}}></View>
//                     <Button
//                       style={{ flex: 1, borderWidth: 0, marginBottom: 0}}
//                       textStyle={{fontSize: 16, color: '#333'}}
//                       onPress={()=>{
//                         this.setState({
//                           showDropMenu: false,
//                           showAll: false
//                         })
//                         this.props.navigation.setParams({showAll: false})
//                       }}>
//                       仅看自己
//                     </Button>
//                   </View>
//                 </ImageBackground>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </Modal>
//       </View>
//     );
//   }
//   componentWillUnmount() {

//   }
// }

// const styles = StyleSheet.create({
//   modalView: {
//     backgroundColor: 'rgba(225,225,225,0)',
//   },
// })

// StockScreen.propTypes = {

// }
// const mapStateToProps = (state) => {
//   const { stock, app, center } = state
//   return {
//     stockToDo: stock.get('stockToDo'),
//     stocking: stock.get('stocking'),
//     stocked: stock.get('stocked'),
//     userInfo: app.get('userInfo'),
//     currentRepertory: center.get('currentRepertory'),
//   }
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch,
//     _requestStockBillList: (params)=>{
//       dispatch(fetchData({
//         body: params,
//         showLoading: true,
//         api: API.API_STOCK_LIST,
//         success: data => {
//           console.log('get stock list succsee ',data)
//           data.checkStatus = params.checkStatus
//           dispatch(receiveStockBillList(data))
//         },
//         fail: error => {
//           console.log('???', error)
//         }
//       }))

//       /* 继续盘点 */
//       // dispatch(fetchData({
//       //   body: params,
//       //   showLoading: true,
//       //   api: API.API_CONTINUE_STOCKING,
//       //   success: data => {
//       //     console.log('get stock list succsee ',data)
//       //     dispatch(receiveStockBillList(data))
//       //   },
//       //   fail: error => {
//       //     console.log('???', error)
//       //   }
//       // }))

//             /* 盘点单详情 */
//       // dispatch(fetchData({
//       //   body: params,
//       //   showLoading: true,
//       //   api: API.API_STOCK_BILL_DETAIL,
//       //   success: data => {
//       //     console.log('get stock list succsee ',data)
//       //     dispatch(receiveStockBillList(data))
//       //   },
//       //   fail: error => {
//       //     console.log('???', error)
//       //   }
//       // }))

//                   /* 盘点 缺货 */
//       // dispatch(fetchData({
//       //   body: params,
//       //   showLoading: true,
//       //   api: API.API_STOCKOUT,
//       //   success: data => {
//       //     console.log('get stock list succsee ',data)
//       //     dispatch(receiveStockBillList(data))
//       //   },
//       //   fail: error => {
//       //     console.log('???', error)
//       //   }
//       // }))



//       // dispatch(fetchData({
//       //   body: params,
//       //   showLoading: true,
//       //   api: API.API_STOCK_CONFIRM,
//       //   success: data => {
//       //     console.log('get stock list succsee ',data)
//       //     dispatch(receiveStockBillList(data))
//       //   },
//       //   fail: error => {
//       //     console.log('???', error)
//       //   }
//       // }))

//     },
//     _takeStockTask: (params) => {
//       dispatch(fetchData({
//         body: params,
//         api: API.API_TAKE_STOCK_TASK,
//         showLoading: true,
//         success: data => {
//           console.log('领取盘点任务成功',data);
//           /* 领取盘点任务成功后跳转到盘点工作区 */
//           /* 移除待盘点列表中的这一项 */

//         },
//         fail: error => {

//         }
//       }))
//     }
//   }
// }
// export default connect(mapStateToProps,mapDispatchToProps)(StockScreen)