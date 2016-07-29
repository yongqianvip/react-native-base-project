

export default function request(url='https://m.alibaba.com/products/tool_cabinet/1.html?XPJAX=1&_=1469698336333', body = {}) {
	return new Promise((resolve, reject) => {
		fetch(url,{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
		.then((response) => {
			return response.json();
		})
		.then((jsonData) => {
			resolve(jsonData);
		})
		.catch((error) => {
			console.warn(error);
			reject(error);
		});
	})
}





