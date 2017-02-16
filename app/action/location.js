import * as ActionTypes from '../constants/actionTypes'
import HttpRequest from '../util/Http.js'
import Coordtransform from 'coordtransform'

const URLHeader = 'http://api.map.baidu.com/geocoder/v2/?output=json&pois=1&ak=tKviYWmG131ZLf2Cp4G0jFHq5eZuNd9E&location='
export function getAddressWithLocation(lng,lat) {
	const wgs84togcj02 = Coordtransform.wgs84togcj02(lng,lat);
	console.log("----- 国测局坐标 location ",wgs84togcj02);

	//国测局坐标转百度经纬度坐标
	const gcj02tobd09 = Coordtransform.gcj02tobd09(wgs84togcj02[0], wgs84togcj02[1]);
	console.log("----- 百度坐标 location ",gcj02tobd09);

	return dispatch => {
		return HttpRequest(`${URLHeader}${gcj02tobd09[1]},${gcj02tobd09[0]}`)
			.then((responseData) => {
				console.log("取得逆向地理位置解析结果: ",responseData);
				if (responseData.status == 0) {
					console.log("逆向地理位置解析成功");
					dispatch(gotCurrentLocation({
						province: responseData.result.addressComponent.province,
						city: responseData.result.addressComponent.city,
						district: responseData.result.addressComponent.district,
						detailAddress: `${responseData.result.addressComponent.street}${responseData.result.addressComponent.street_number}`
					}));
				} else {
					console.error('逆向地理位置解析出错');
				}
			})
			.catch((error) => {
				console.log("error",error);
			});
	}
}

export function gotCurrentLocation(currentLocationObj) {
	return {
		type: ActionTypes.GOT_CURRENT_LOCATION,
		value: currentLocationObj,
	}
}

export function resetSelectedLocation() {
	return {
		type: ActionTypes.RESET_CURRENT_LOCATION,
		value: null,
	}
}