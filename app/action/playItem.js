import * as ActionTypes from '../constants/actionTypes'

export function changePlayItemShowIndex (showingIndex=0) {
	return {
		type: ActionTypes.CHANGE_PLAY_ITEM_SHOW_INDEX,
		payload: {
			showingIndex
		}
	}
}