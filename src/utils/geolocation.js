
import Coordtransform from 'coordtransform'

export const getAMapLocation = (longitude,latitude) =>{
	const wgs84togcj02 = Coordtransform.wgs84togcj02(longitude,latitude);
	return {
		longitude: wgs84togcj02[0],
		latitude: wgs84togcj02[1]
	}
}

export const getBaiduMapLoacation = (longitude,latitude) => {
	const wgs84togcj02 = Coordtransform.wgs84togcj02(longitude,latitude);
	const amapCoords = {
		longitude: wgs84togcj02[0],
		latitude: wgs84togcj02[1]
	}
	const gcj02tobd09 = Coordtransform.gcj02tobd09(amapCoords.longitude, amapCoords.latitude);
	return {
		longitude: gcj02tobd09[0],
		latitude: gcj02tobd09[1]
	}
}

export function getAddressWithLocation(lng,lat) {
	const wgs84togcj02 = Coordtransform.wgs84togcj02(lng,lat);
	const amapCoords = {
		lng: wgs84togcj02[0],
		lat: wgs84togcj02[1]
	}
	const gcj02tobd09 = Coordtransform.gcj02tobd09(amapCoords.lng, amapCoords.lat);
	const baiduCoords = {
		lng: gcj02tobd09[0],
		lat: gcj02tobd09[1]
	}
	return new Promise((resolve, reject) => {
		resolve({amapCoords,baiduCoords})
	})
	// return new Promise((resolve, reject) => {
	// 	fetch(`${URLHeader}${baiduCoords.lat},${baiduCoords.lng}`,{
	// 		method: 'POST',
	// 		headers: {
	// 			'Accept': 'application/json',
	// 			'Content-Type': 'application/x-www-form-urlencoded',
	// 		},
	// 	})
	// 	.then((response) => {
	// 		return response.json();
	// 	})
	// 	.then((responseData) => {
	// 		responseData.amapCoords = amapCoords
	// 		responseData.baiduCoords = baiduCoords
	// 		console.log("取得逆向地理位置解析结果: ",responseData);
	// 		if (responseData.status == 0) {
	// 			console.log("逆向地理位置解析成功");
	// 			// responseData.result.pois.map((item)=>{
	// 			// 	console.log(`周边-> ${item.name}, ${item.addr} , ${item.point.x}, ${item.point.y}`);
	// 			// })
	// 			resolve({...responseData.result.addressComponent,amapCoords,baiduCoords})
	// 		} else {
	// 			console.warn('逆向地理位置解析出错');
	// 			resolve({amapCoords,baiduCoords})
	// 		}
	// 	})
	// 	.catch((error) => {
	// 		console.warn(error);
	// 		reject(error);
	// 	});
	// })
}
