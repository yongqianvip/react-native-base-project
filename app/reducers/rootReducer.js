import { combineReducers } from 'redux'

import * as ActionTypes from '../constants/actionTypes';

const initialState = {
    products: [],
    isRefreshing: false,
    isLoadingMore: false,
    totalWarehouseCount: 100
};

function reducer(state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case ActionTypes.GET_PRODUCT_LIST_SUCC:
            if (action.pageNo === 1) {
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
