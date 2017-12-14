import * as ActionType from '../constant/actionTypes.js'

export const updateWeatherAction = (payload) => {
	return {type: ActionType.ACTION_UPDATE_WEATHER, payload}
}

