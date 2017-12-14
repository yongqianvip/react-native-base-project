import Immutable from 'immutable';
import * as ActionType from '../constant/actionTypes.js'

const initialState = Immutable.fromJS({
	article: {
		a: '1234'
	},
	active: {
		news:[],
		isLoadingMore: false,
		pageNo: 1,
		isRefreshing: false
	}
})

const pmArticle = (state = initialState, action) => {
	let newState =state
	switch (action.type) {
		case ActionType.ACTION_PM_ACTIVE_NEWS:
			newState = newState.setIn(['active','news'], Immutable.fromJS(action.payload.RESULT.news))
			return newState
		default:
			return state
	}
}

export default pmArticle
