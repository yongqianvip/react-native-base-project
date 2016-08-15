import React from 'react';
import {
	View,
	Navigator
} from 'react-native';
import { connect } from 'react-redux'

import ProductListContainer from './ProductListContainer'
import OtherContainer from './OtherContainer.js'
import TabNavigator from 'react-native-tab-navigator'
import Icon from 'react-native-vector-icons/Ionicons';
import reducer from '../reducers/rootReducer.js'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'home'
        };
    }


    render() {
        return (
            <TabNavigator tabBarStyle={{ backgroundColor:'white' }} style={{backgroundColor: 'white'}}>
                <TabNavigator.Item
                    title="主页"
                    selected={this.state.selectedTab === 'home'}
                    renderIcon={() => <Icon name={ 'ios-videocam' } size={30} color={'gray'}/>}
                    renderSelectedIcon={() => <Icon name={ 'ios-videocam' } size={30} color={'#4E78E7'}/>}
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    <ProductListContainer {...this.props}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    title="其他"
                    selected={this.state.selectedTab === 'other'}
                    renderIcon={() => <Icon name={ 'ios-person-add' } size={30} color={'gray'}/>}
                    renderSelectedIcon={() => <Icon name={ 'ios-person-add' } size={30} color={'#4E78E7'}/>}
                    onPress={() => this.setState({ selectedTab: 'other' })}>
                    <OtherContainer {...this.props}/>
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
} 
function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(App);