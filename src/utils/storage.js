/**
 * database tools class
 */

import { AsyncStorage } from 'react-native';

class Storage {

	save(key, value) {
		let result = value;
		if (!key || !value);
		if (value && typeof value === 'object') {
			result = JSON.stringify(value);
		}
		return AsyncStorage.setItem(key, result);
	}

	async get(key) {
		const value = await AsyncStorage.getItem(key);
		let result;
		try {
			result = JSON.parse(value);
		} catch(e) {
			result = value;
		}
		return result;
	}

	/**
	 * [multiGet description]
	 * 		multiGet(['k1', 'k2'], cb) -> cb([['k1', 'val1'], ['k2', 'val2']])
	 * @param  {[type]} keys [description]
	 * @return {[type]}      [description]
	 */
	async multiGet(keys) {
		const values = await AsyncStorage.multiGet(keys);
		const result = {};
		values.forEach((value) => {
			let _value;
			try {
				_value = JSON.parse(value[1]);
			} catch(e) {
				_value = value[1];
			}
			result[value[0]] = _value;
		});
		return result;
	}

	mergeItem(key, value) {
		let result = value;
		if (typeof value === 'object') {
			result = JSON.stringify(value);
		}
		return AsyncStorage.mergeItem(result);
	}

	remove(key) {
		return AsyncStorage.removeItem(key);
	}

	clear() {
		return AsyncStorage.clear();
	}

}

const instance = new Storage();

export default instance;