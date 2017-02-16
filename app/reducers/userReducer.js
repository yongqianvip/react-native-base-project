
import * as ActionTypes from '../constants/actionTypes';

const initialState = {
    products: [],
    isRefreshing: false,
    isLoadingMore: false,
    totalProductCount: 200,  //由服务端返回 这里临时指定一个值设置为上限
    tabbarShow: true,
    tabbarHeight: 49,
    viewRecord: [],
    currentLocationObj: null,
    selectedLocationObj: null
};

const userReducer = (state = initialState, action) => {
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
            console.log(" 状态变为： 正在加载中。。。。 ",action.value);
            newState = Object.assign({}, state, {
                isRefreshing: action.value
            });
            return newState;
        case ActionTypes.CHANGE_PRODUCT_LIST_LOADINGMORE:
            newState = Object.assign({}, state, {
                isLoadingMore: action.value
            });
            return newState;
        case ActionTypes.TABBAR_SHOULD_SHOW:
            newState = Object.assign({}, state, {
                tabbarHeight: action.value ? 49 : 0
            });
            return newState;
        case ActionTypes.GET_VIEW_RECORDS:
            newState = Object.assign({}, state, {
                viewRecord: action.value
            });
            return newState;
        case ActionTypes.GOT_CURRENT_LOCATION:
            newState = Object.assign({}, state, {
                currentLocationObj: action.value,
                selectedLocationObj: action.value
            });
            return newState;
        case ActionTypes.RESET_CURRENT_LOCATION:
            newState = Object.assign({}, state, {
                selectedLocationObj: null
            });
            return newState;
        default:
            return state
    }
}

export default userReducer



