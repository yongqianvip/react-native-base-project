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

import { connect } from 'react-redux'
import ProductList from '../components/ProductList.js'
import LoadingView from '../common/LoadingView.js'

import userReducer from '../reducers/userReducer.js'
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
import ProductImageContainer from './ProductImageContainer.js'
import backIcon from '../../localSource/images/back.png'
import SearchBar from '../components/SearchBar.js'
const { width, height } = Dimensions.get('window')

let _pageNo = 1;
const _pageSize = 30;

class ProductListContainer extends Component {

	constructor(props) {
	  super(props);
	}

	componentDidMount() {
		this.props.dispatch(getProductList(_pageNo));
		// console.log("--- home props ",this.props);
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

	_toEnd() {
		const { userReducer, dispatch } = this.props;
		console.log("加载更多？ ",userReducer.isLoadingMore, userReducer.products.length, userReducer.totalProductCount,userReducer.isRefreshing);
		//ListView滚动到底部，根据是否正在加载更多 是否正在刷新 是否已加载全部来判断是否执行加载更多
		if (userReducer.isLoadingMore || userReducer.products.length >= userReducer.totalProductCount || userReducer.isRefreshing) {
			console.log("return 了");
			return;
		};

		dispatch(changeProductListLoadingMore(true));

		console.log("触发加载更多 toEnd() --> ");
		_pageNo = parseInt(userReducer.products.length / _pageSize) + 1;
		dispatch(getProductList(_pageNo));
	}


	render() {
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		const { products, isRefreshing, isLoadingMore} = this.props;

		return (
			// <ProductList {...this.props} />
			<View>
				<NavigationBar title={'首页'}/>
				<ListView style={ styles.listViewContent }
					dataSource={ ds.cloneWithRows(products) }
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
							refreshing={ isRefreshing }
							onRefresh={ this._onRefresh.bind(this) }
							tintColor="gray"
							colors={['#ff0000', '#00ff00', '#0000ff']}
							progressBackgroundColor="gray"/>
					}/>
				<LoadingView showLoading={ isLoadingMore }></LoadingView>
			</View>
		);
	}
	_renderFooter() {
		const { products, isRefreshing, totalProductCount } = this.props;
		//通过当前product数量和刷新状态（是否正在下拉刷新）来判断footer的显示
		if (products.length < 1 || isRefreshing) {
			return null
		};
		if (products.length < totalProductCount) {
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

function mapStateToProps(state) {
	const {
		productReducer,
		userReducer
	} = state;
	return userReducer;
}

export default connect(mapStateToProps)(ProductListContainer);