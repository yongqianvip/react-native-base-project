const Fetch = store => next => action => {
	console.log('====================================');
	console.log('f发起网络请求', action.type, action.payload);
	console.log('====================================');
	if (action.type != 'ACTION_FETCH') {
		return next(action);
	}

	const params = action.payload
	console.log(" %c *** FETCH_PARAMS_URL ","color:blue",params.url);
	console.log(" %c *** FETCH_PARAMS_BODY ","color:blue",params.body);
	if (!params) {
		throw('FETCH ERROR: no params !!!')
		return;
	};
	if (!params.requestType) {
		throw('FETCH ERROR: no requestType !!!')
		return;
	};
	if (!params.url) {
		throw('FETCH ERROR: no request url !!!')
		return;
	};

	request(params).then((result)=>{
		params && params.success && params.success(result)
		console.log(" %c *** FETCH_SUCCESS ","color:green",result)
	},(fail)=>{
		params && params.fail && params.fail(fail)
		console.log(" %c *** FETCH_FAIL ","color:red",fail)
	})

}

const _fetch = (requestPromise, timeout=30000) => {
  let timeoutAction = null;
  const timerPromise = new Promise((resolve, reject) => {
    timeoutAction = () => {
      reject('请求超时');
    }
  })
  setTimeout(()=>{
    timeoutAction()
  }, timeout)
  return Promise.race([requestPromise,timerPromise]);
}

const request = (params) => {
  const {url,body} = params;
  let myFetch
  if (params.requestType.toUpperCase() === 'GET') {
		let bodyString = '?';
		Object.keys(body).forEach((key, index) => {
			bodyString += `${ index === 0 ? '' : '&' }${ key }=${ encodeURIComponent(body[key]) }`;
		});
		myFetch = fetch(url+bodyString)
  }else{
		const jsonBody = JSON.stringify(params.body)
		myFetch = fetch(url,{
			method: 'post',
			headers:{
				"Accept": "application/json",
				"Content-Type" : "application/json"
			},
			body:jsonBody,
		})
  }

  if (!myFetch) {
  	throw error
  	return
  };

	return new Promise((resolve, reject) => {
	  _fetch(myFetch, 30000)
	    .then(response => {
        return response.json();
	    })
	    .then(responseData=>{
	      resolve(responseData)
	    })
	    .catch(error=>{
        // ToastMessage('网络错误？');
        reject(error);
    });
  });
}

export default Fetch