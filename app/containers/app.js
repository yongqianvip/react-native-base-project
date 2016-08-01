import React from 'react';
import {
	View,
	Navigator
} from 'react-native';
import ProductListContainer from './ProductListContainer'

export default class App extends React.Component {

    render() {
        let defaultComponent = ProductListContainer;
        return (
        <Navigator 
        	initialRoute={{ component: defaultComponent }}
        	configureScene={(route) => {
            	return Navigator.SceneConfigs.FloatFromRight;
			}}
			renderScene={(route, navigator) => {
				let Component = route.component;
				return <Component {...route.params} navigator={navigator} />
			}} />
        );
    }
} 
