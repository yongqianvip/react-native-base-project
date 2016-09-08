
import {
    AsyncStorage
} from 'react-native';

export default class Storage {
	
	// 增
	static saveWithKeyValue(key,value) {
		try {
			return AsyncStorage.setItem(key, JSON.stringify(value), ()=>{
				console.log("save success with key:value => ",key, value);
			});
		} catch(e) {
			console.log(e);
		}
	}

	// 查
	static getValueForKey(key) {
		try {
			return AsyncStorage.getItem(key, ()=>{
				console.log("trying to get value with key :", key);
			}).then((value)=>{
				return JSON.parse(value);
			},
			(e) => {
				console.log("------eeeeeeeee",e);
			});
		} catch(e) {
			console.log(e);
		}
	}

	// 删
	static removeValueForKey(key) {
		try {
			return AsyncStorage.removeItem(key, ()=>{
				console.log("remove value for key: ",key);
			});
		} catch(e) {
			console.log(e);
		}
	}

	// merge
	static mergeArrayWithKeyValue(key,value) {
		try {
			return Storage.getValueForKey(key).then((val)=>{
				if (typeof val === 'undefined' || val === null) {
					Storage.saveWithKeyValue(key,[value]);
					console.log(`key: ${key} is undefined, save array`);
				} else {
					val.unshift(value);
					Storage.saveWithKeyValue(key,val);
				}
			})
		} catch(e) {
			console.log(e);
		}
	}


}