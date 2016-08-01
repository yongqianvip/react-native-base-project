 RN-ListViewLoadMore
react-native中处理ListView的下拉刷新和上拉加载更多  

* 项目clone到本地后先执行如下命令

	$ npm install


`ReactNative`(`RN`)中的`ListView`是一个非常常用的组件，`RN`中已经有了现成的`RefreshControl`，官方文档中有具体用法，这里主要记录一下我是如何做**上拉加载更多**的
示例中的数据来源于阿里巴巴网站

	https://m.alibaba.com/products/tool_boxes/2.html?XPJAX=1
	https://m.alibaba.com/products/tool_boxes/3.html?XPJAX=1
	https://m.alibaba.com/products/tool_boxes/4.html?XPJAX=1
		
因为没有涉及原生部分代码，且`RN`组件也是通用的，所以理论上是兼容`iOS`和`Android`的

[工程源码在这里](https://github.com/yongqianvip/RN-ListViewLoadMore)    


* 目录结构如图：  
	![tree](https://github.com/yongqianvip/RN-ListViewLoadMore/blob/master/localSource/images/tree.png?raw=true)  
	熟悉[`Redux`](http://cn.redux.js.org/docs/basics/Reducers.html)  的对这个结构肯定不陌生，为了尽可能的简单，工程中只保留了单个`Action`(`product.js`)和单个`Reducer`(`rootReducer.js`)
	

* 一定要把控好各种状态  

	不管是下拉刷新，还是加载更多，都要有一个对应的状态来控制，以便于**加锁**，防止重复操作  
	如果`isLoadingMore`为`true`，不能再响应`LoadMoreData`方法  
	`LoadMoreData`结束（成功或失败）后将`isLoadingMore`置为`false`
	
* 关键方法 `onEndReached`

	ListView在滚动到最后一个`Cell`的时候，会触发`onEndReached`方法，就是从这个方法入手，在`ProductList.js`中，
	
		let _pageNo = 2;
		const _pageSize = 30;
		export defaultclass ProductList extends Component {

			...
			
			_toEnd() {
				const { reducer } = this.props;
				//ListView滚动到底部，根据是否正在加载更多 是否正在刷新 是否已加载全部来判断是否执行加载更多
				if (reducer.isLoadingMore || reducer.products.length >= reducer.totalProductCount || reducer.isRefreshing) {
					return;
				};
				InteractionManager.runAfterInteractions(() => {
					console.log("触发加载更多 toEnd() --> ");
					this._loadMoreData();
				});
			}
			_loadMoreData() {
				const { reducer, dispatch } = this.props;
				dispatch(changeProductListLoadingMore(true));
				_pageNo = Number.parseInt(reducer.products.length / _pageSize) + 1;
				dispatch(getProductList(_pageNo));
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
			
			...
		}


* 加载更多组件`LoadMoreFooter`

		import React, { Component } from 'react';
		import {
		    View,
		    Text,
		    StyleSheet,
		} from 'react-native';
		class LoadMoreFooter extends Component {
		    constructor(props) {
		        super(props);
		    }
		    render() {
		        return (
		            <View style={styles.footer}>
		                <Text style={styles.footerTitle}>{this.props.isLoadAll ? '已加载全部' : '正在加载更多……'}</Text>
		            </View>
		        )
		    }
		}
		const styles = StyleSheet.create({
		    footer: {
		        flexDirection: 'row',
		        justifyContent: 'center',
		        alignItems: 'center',
		        height: 40,
		    },
		    footerTitle: {
		        marginLeft: 10,
		        fontSize: 15,
		        color: 'gray'
		    }
		})
		
		export default LoadMoreFooter	
