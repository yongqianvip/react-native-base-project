
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
} from 'react-native'
import { request } from '../util/Http.js'
import reducer from '../reducers/rootReducer.js'
import LoadMoreFooter from '../components/LoadMoreFooter.js'
import ProductCell from '../components/ProductCell.js'
const { width, height } = Dimensions.get('window')

import {
	getProductList,
	changeProductListRefreshing,
	changeProductListLoadingMore
} from '../action/product.js';
import ProductDetailContainer from '../containers/ProductDetailContainer.js'

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

		console.log("去商品详情页",rowData);
		if(navigator) {
			navigator.push({
			    name: 'ProductDetailContainer',
			    component: ProductDetailContainer,
			})
		}
	}

	_renderRow(rowData,SectionId,rowID) {
		return <ProductCell rowData={rowData} rowID={ rowID } goToDetail={ this._goToDetail.bind(this) }/>
	}

	_onRefresh() {
		this.props.dispatch(getProductList(1));
	}

	_loadMoreData() {
		const { reducer, dispatch } = this.props;
		dispatch(changeProductListLoadingMore(true));
		_pageNo = Number.parseInt(reducer.products.length / _pageSize) + 1;
		dispatch(getProductList(_pageNo));
	}

	_toEnd() {
		const { reducer } = this.props;
		console.log("加载更多？ ",reducer.isLoadingMore, reducer.products.length, reducer.totalProductCount,reducer.isRefreshing);
		//ListView滚动到底部，根据是否正在加载更多 是否正在刷新 是否已加载全部来判断是否执行加载更多
		if (reducer.isLoadingMore || reducer.products.length >= reducer.totalProductCount || reducer.isRefreshing) {
			return;
		};
		InteractionManager.runAfterInteractions(() => {
			console.log("触发加载更多 toEnd() --> ");
			this._loadMoreData();
		});
	}

	render() {
		const { reducer } = this.props;
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return (
			<ListView style={ styles.listViewContent } 
				dataSource={ ds.cloneWithRows(reducer.products) } 
				renderRow={ this._renderRow.bind(this) }
				onEndReached={ this._toEnd.bind(this) }
				onEndReachedThreshold={10}
				renderFooter={ this._renderFooter.bind(this) }
				enableEmptySections={true} 
				refreshControl={
					<RefreshControl
						refreshing={ reducer.isRefreshing }
						onRefresh={ this._onRefresh.bind(this) }
						tintColor="gray"
						colors={['#ff0000', '#00ff00', '#0000ff']}
						progressBackgroundColor="gray"/>
					}/>
				
		)
	}

	_renderFooter() {
		const { reducer } = this.props;
		//通过当前product数量和刷新状态（是否正在下拉刷新）来判断footer的显示
		if (reducer.products.length < 1 || reducer.isRefreshing) {
			return null
		};
		if (reducer.products.length < reducer.totalProductCount) {
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
		paddingTop: 5,
		paddingBottom: 20,
		marginBottom: 0,
		backgroundColor: '#FFEFDB',
	}
})

export default ProductList
