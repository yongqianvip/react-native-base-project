
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

let _pageNo = 2;
const _pageSize = 30;

class ProductList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			products:['1','2','3','4','5','6']
		}
	}

	componentDidMount() {
		this.props.dispatch(getProductList(_pageNo));		
	}

	_renderRow(rowData, sectionID, rowID, highlightRow) {
		return <ProductCell rowData={rowData} rowID={ rowID }/>
	}

	_loadMoreData() {
		const { reducer, dispatch } = this.props;
		dispatch(changeProductListLoadingMore(true));
		_pageNo = Number.parseInt(reducer.products.length / _pageSize) + 1;
		dispatch(getProductList(_pageNo));
	}

	_toEnd() {
		const { reducer } = this.props;
		if (reducer.isLoadingMore) {
			return;
		};
		if (reducer.products.length >= reducer.totalWarehouseCount || reducer.isRefreshing) {
			return;
		};
		InteractionManager.runAfterInteractions(() => {
			console.log("触发加载更多 toEnd() --> ");
			this._loadMoreData();
		});
	}

	_onRefresh() {
		this.props.dispatch(getProductList(2));
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
		if (reducer.products.length < 1 || reducer.isRefreshing) {
			return null
		};
		if (reducer.products.length < reducer.totalWarehouseCount) {
			return <LoadMoreFooter />
		}else{
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
