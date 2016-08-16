
import * as ActionTypes from '../constants/actionTypes'

// function gotProductList (argument,pageNo) {
// 	return {
// 		type: ActionTypes.GET_PRODUCT_LIST_SUCC,
// 		value: argument,
// 		pageNo
// 	}
// }
// 刷新（状态）
export function ShowTabBar(argument) {
	return {
		type: ActionTypes.TABBAR_SHOULD_SHOW,
		value: argument
	}
}



