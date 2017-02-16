
import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	ListView,
	InteractionManager,
	RefreshControl,
	Platform,
} from 'react-native'
import { request } from '../util/Http.js'
// import userReducer from '../reducers/rootReducer.js'
import LoadMoreFooter from '../components/LoadMoreFooter.js'
import ProductCell from '../components/ProductCell.js'
import NavigationBar from '../common/NavBarCommon.js'
import {
	getProductList,
	changeProductListRefreshing,
	changeProductListLoadingMore
} from '../action/product.js'
import Storage from '../common/Storage.js'
// import ProductDetailContainer from '../containers/ProductDetailContainer.js'
import ProductImageContainer from '../containers/ProductImageContainer.js'
import backIcon from '../../localSource/images/back.png'
import SearchBar from './SearchBar.js'

const { width, height } = Dimensions.get('window')

let _pageNo = 1;
const _pageSize = 30;

class ProductList extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.dispatch(getProductList(_pageNo));
	}

	_goToDetail(rowData) {
		const { navigator } = this.props;
		const imageUrl = `https:${rowData.imagePath}`;
		console.log("去商品详情页",rowData);
		// Storage.removeValueForKey('lastestRecord');
		Storage.mergeArrayWithKeyValue('lastestRecord',{name: rowData.companyName,id: rowData.companyId, imagePath: rowData.imagePath, productName: rowData.productName});
		if(navigator) {
			navigator.push({
			    component: ProductImageContainer,
			    params: {
			    	rowData
			    }
			})
		}
	}

	_onRefresh() {
		this.props.dispatch(getProductList(1));
	}

	_loadMoreData() {
		const { userReducer, dispatch } = this.props;
		dispatch(changeProductListLoadingMore(true));
		_pageNo = parseInt(userReducer.products.length / _pageSize) + 1;
		dispatch(getProductList(_pageNo));
	}

	_toEnd() {
		const { userReducer } = this.props;
		console.log("加载更多？ ",userReducer.isLoadingMore, userReducer.products.length, userReducer.totalProductCount,userReducer.isRefreshing);
		//ListView滚动到底部，根据是否正在加载更多 是否正在刷新 是否已加载全部来判断是否执行加载更多
		if (userReducer.isLoadingMore || userReducer.products.length >= userReducer.totalProductCount || userReducer.isRefreshing) {
			return;
		};
		InteractionManager.runAfterInteractions(() => {
			console.log("触发加载更多 toEnd() --> ");
			this._loadMoreData();
		});
	}

	render() {
		const { userReducer } = this.props;
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return (
			<View>
				<NavigationBar title={'首页'}/>
				<ListView style={ styles.listViewContent }
					dataSource={ ds.cloneWithRows(userReducer.products) }
					renderRow={ (rowData,SectionId,rowID) => {
						return <ProductCell rowData={rowData} rowID={ rowID } goToDetail={ this._goToDetail.bind(this) }/>
					} }
					renderHeader={ () => {
						return <SearchBar />
					} }
					onEndReached={ this._toEnd.bind(this) }
					onEndReachedThreshold={10}
					renderFooter={ this._renderFooter.bind(this) }
					enableEmptySections={true}
					refreshControl={
						<RefreshControl
							refreshing={ userReducer.isRefreshing }
							onRefresh={ this._onRefresh.bind(this) }
							tintColor="gray"
							colors={['#ff0000', '#00ff00', '#0000ff']}
							progressBackgroundColor="gray"/>
						}/>
			</View>
		)
	}

	_renderFooter() {
		const { userReducer } = this.props;
		//通过当前product数量和刷新状态（是否正在下拉刷新）来判断footer的显示
		if (userReducer.products.length < 1 || userReducer.isRefreshing) {
			return null
		};
		if (userReducer.products.length < userReducer.totalProductCount) {
			//还有更多，默认显示‘正在加载更多...’
			return <LoadMoreFooter />
		}else{
			// 加载全部
			return <LoadMoreFooter isLoadAll={true}/>
		}
	}

}

const styles = StyleSheet.create({
	listViewContent: {
		flex: 1,
		paddingBottom: 20,
		marginBottom: 0,
		backgroundColor: '#FFEFDB',
		height: height - 49 - (Platform.OS === 'ios' ? 64 : 44),
	},
	searchBar: {
		backgroundColor: 'yellow',
		height: 40,
		flexDirection: 'row'
	}
})

export default ProductList
