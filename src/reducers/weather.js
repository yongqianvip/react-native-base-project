import Immutable from 'immutable';
import * as ActionType from '../constant/actionTypes.js'

const initialState = Immutable.fromJS({
	weather: {}
})

const pmArticle = (state = initialState, action) => {
	let newState =state
	switch (action.type) {
		case ActionType.ACTION_UPDATE_WEATHER:
			newState = newState.set('weather', Immutable.fromJS(action.payload))
			return newState
		default:
			return state
	}
}

export default pmArticle
