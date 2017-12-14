import * as ActionType from '../constant/actionTypes.js'

const initialState = {
	foo: '0',
	bar: '1'
}

const foo = (state = initialState, action) => {
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

export default foo