import * as ActionType from '../constant/actionTypes.js'

export const Fetch = (params) => {
	return {
		type: ActionType.ACTION_FETCH,
		payload: params
	}
}