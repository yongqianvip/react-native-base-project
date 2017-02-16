// import { combineReducers } from 'redux'

// import * as ActionTypes from '../constants/actionTypes';

// const initialState = {
//     products: [],
//     isRefreshing: false,
//     isLoadingMore: false,
//     totalProductCount: 200,  //由服务端返回 这里临时指定一个值设置为上限
//     tabbarShow: true,
//     tabbarHeight: 49,
//     viewRecord: [],
// };

// function reducer(state = initialState, action) {
//     let newState = state;
//     switch (action.type) {
//         case ActionTypes.GET_PRODUCT_LIST_SUCC:
//             console.log("刷新 重置products",action.pageNo);
//             if (action.pageNo === 1) {
//                 console.log("刷新 重置products");
//                 newState = Object.assign({}, state, {
//                     products: action.value.productNormalList
//                 });
//             } else {
//                 newState = Object.assign({}, state, {
//                     products: state.products.concat(action.value.productNormalList)
//                 });
//             }
//             return newState;
//         case ActionTypes.CHANGE_PRODUCT_LIST_REFRESHING:
//             newState = Object.assign({}, state, {
//                 isRefreshing: action.value
//             });
//             return newState;
//         case ActionTypes.CHANGE_PRODUCT_LIST_LOADINGMORE:
//             newState = Object.assign({}, state, {
//                 isLoadingMore: action.value
//             });
//             return newState;
//         case ActionTypes.TABBAR_SHOULD_SHOW:
//             newState = Object.assign({}, state, {
//                 tabbarHeight: action.value ? 49 : 0
//             });
//             return newState;
//         case ActionTypes.GET_VIEW_RECORDS:
//             newState = Object.assign({}, state, {
//                 viewRecord: action.value
//             });
//             return newState;
//         default:
//             return state
//     }
// }

// const rootReducer = combineReducers({ reducer })

// export default rootReducer




import { combineReducers } from 'redux'
import userReducer from './userReducer.js'
import productReducer from './productReducer.js'
import playReducer from './playReducer.js'

const rootReducer = combineReducers({
    userReducer,
    productReducer,
    playReducer
})

export default rootReducer

