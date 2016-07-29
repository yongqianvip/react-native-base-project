
import * as ActionTypes from '../constants/actionTypes'
import HttpRequest from '../util/Http.js'
const HOST = 'https://m.alibaba.com'

export function getProductList (pageNo=1) {
	return dispatch => {
		if (pageNo === 1) {
			dispatch(changeProductListRefreshing(true));
		};
		return HttpRequest(`${HOST}/products/tool_cabinet/${pageNo}.html?XPJAX=1`)
			.then((responseData) => {
				dispatch(gotProductList(responseData,pageNo,));
				console.log(`---------> ,成功加载${responseData.productNormalList.length}条数据`);
				if (pageNo === 1) {
					dispatch(changeProductListRefreshing(false));
				}else{
					dispatch(changeProductListLoadingMore(false));
				}
			})
			.catch((error) => {
				dispatch(changeProductListRefreshing(false));
				dispatch(changeProductListLoadingMore(false));
				console.log("error",error);
			});
	}
}

function gotProductList (argument,pageNo) {
	return {
		type: ActionTypes.GET_PRODUCT_LIST_SUCC,
		value: argument,
		pageNo
	}
}
// 刷新（状态）
export function changeProductListRefreshing(argument) {
	return {
		type: ActionTypes.CHANGE_PRODUCT_LIST_REFRESHING,
		value: argument
	}
}
// 加载更多（状态）
export function changeProductListLoadingMore(argument) {
	return {
		type: ActionTypes.CHANGE_PRODUCT_LIST_LOADINGMORE,
		value: argument
	}
}


