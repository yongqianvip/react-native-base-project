import Immutable from 'immutable';
import * as ActionType from '../constant/actionTypes.js'

const initialState = Immutable.fromJS({
	longitude: '',//经度
	latitudes: '',//纬度
	country: '',
	provinceName: '',//省份
	provinceId: '',
	cityName: '',//市
	cityId: '',
	districtsName: '',//区域
	districtsId: '',
	streetName: '',//街道
	streetId: '',

	name: '',
	upper: '',
	locationId: '',
})

const location = (state = initialState, action) => {
	let newState =state
	const {payload} = action
	switch (action.type) {
		case ActionType.ACTION_UPDATE_LOCATION:
			payload.longitude && (newState = newState.set('longitude',payload.longitude))
			payload.cityId && (newState = newState.set('cityId',payload.cityId))
			payload.name && (newState = newState.set('name',payload.name))
			payload.upper && (newState = newState.set('upper',payload.upper))
			payload.cityid && (newState = newState.set('locationId',payload.cityid))
			return newState
		default:
			return state
	}
}

export default location
