import { NavigationActions } from 'react-navigation'

export const navigateAction = (routeName,routeName_sub, params) => {
	return NavigationActions.navigate({
	  routeName: routeName,
	  params,
	  action: routeName_sub ? NavigationActions.navigate({ routeName: routeName_sub}) : null
	})
}

export const resetAction = (index,routeNames) => {
	const action = routeNames.map((routeName,index)=>{
		return NavigationActions.navigate({ routeName })
	})
	return NavigationActions.reset({
		index,
	  action
	})
}

export const backAction = (key) => {
	return NavigationActions.back({
		key
	})
}

export const backAction = (key, params) => {
	return NavigationActions.setParams({
	  params,
	  key
	})
}
