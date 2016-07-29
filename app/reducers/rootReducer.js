import { combineReducers } from 'redux'

import * as ActionTypes from '../constants/actionTypes';

const initialState = {
    products: [],
    isRefreshing: false,
    isLoadingMore: false,
    totalProductCount: 200  //由服务端返回 这里临时指定一个值设置为上限
};

function reducer(state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case ActionTypes.GET_PRODUCT_LIST_SUCC:
            console.log("刷新 重置products",action.pageNo);
            if (action.pageNo === 1) {
                console.log("刷新 重置products");
                newState = Object.assign({}, state, {
                    products: action.value.productNormalList
                });
            } else {
                newState = Object.assign({}, state, {
                    products: state.products.concat(action.value.productNormalList)
                });
            }
            return newState;
        case ActionTypes.CHANGE_PRODUCT_LIST_REFRESHING: 
            newState = Object.assign({}, state, {
                isRefreshing: action.value
            });
            return newState;
        case ActionTypes.CHANGE_PRODUCT_LIST_LOADINGMORE: 
        console.log("正在加载更多么？",action.value);
            newState = Object.assign({}, state, {
                isLoadingMore: action.value
            });
            return newState;
        default:
            return state
    }
}

const rootReducer = combineReducers({ reducer })

export default rootReducer
