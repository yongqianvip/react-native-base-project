import * as ActionType from '../constant/actionTypes.js'

export const Fetch = (params) => {
	console.log('=params===================================', ActionType.ACTION_FETCH);
	console.log(params);
	return {
		type: ActionType.ACTION_FETCH,
		payload: params
	}
}