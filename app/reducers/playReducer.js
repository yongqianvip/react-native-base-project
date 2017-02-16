
import * as ActionTypes from '../constants/actionTypes';

const initialState = {
	showingIndex: 0
};

const PlayReducer = (state = initialState, action) => {
    let newState = state;
    switch (action.type) {
    	case ActionTypes.CHANGE_PLAY_ITEM_SHOW_INDEX:
    		newState = Object.assign({}, state, {
    		    showingIndex: action.payload.showingIndex
    		});
    		return newState;
        default:
            return state
    }
}

export default PlayReducer