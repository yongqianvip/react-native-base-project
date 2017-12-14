import * as ActionType from '../constant/actionTypes.js'

export const action_getPMArticleList = (payload) => {
	return {type: ActionType.ACTION_GET_PM_ARTICLE_LIST, payload}
}

export const getPMActiveNewsAction = (payload) => {
	return {type: ActionType.ACTION_PM_ACTIVE_NEWS, payload}
}

