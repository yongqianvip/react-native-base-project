import * as ActionType from '../constant/actionTypes.js'

const initialState = {
	foo1: '0',
	bar1: '1'
}

const foo1 = (state = initialState, action) => {
	let newState = Object.assign({}, state)
	switch (action.type) {
		case ActionType.ACTION_ADD_TO_DO:

			return newState
		case ActionType.ACTION_FOO:

			return newState
		default:
			return state
	}
}

export default foo1