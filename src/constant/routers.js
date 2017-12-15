import React from 'react';
import { View, Text, Button, Modal } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator, addNavigationHelpers } from 'react-navigation';
import HomeScreen from '../container/home.js'
import DetailsScreen from '../container/detail.js'
import MineScreen from '../container/mine.js'
import TempScreen from '../container/temp.js'
import Temp2Screen from '../container/temp2.js'
import WelcomeScreen from '../container/welcome.js'
import IamPmScreen from '../container/pm/iampm.js'
import ArticleListScreen from '../container/pm/article.js'
import WeatherScreen from '../container/weather/weather.js'
import ProgressViewScreen from '../container/animated/progressView.js'
import WeatherWebScreen from '../container/weather/weatherWeb';

const MainScreenNavigator = TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      title: `${navigation? navigation.state ? navigation.state.params ? navigation.state.params.name : 'Home' : 'Home' : 'Home'}`,
    }),
  },
  IamPm: {
    screen: IamPmScreen
  },
  Mine: {
    screen: MineScreen
  }
}, {
  tabBarOptions:{
    // showLabel: false,
    style: {
      height: 49,           //iPhone X 49 + 34
      paddingBottom: 0,      //iPhone X 34
      backgroundColor: 'white',
      padding: 1,
      borderTopColor: 'lightgray'
    },
    labelStyle: {
      fontSize: 14
    },
    tabStyle: {
      backgroundColor: 'white'
    }
  }
})

class NavigatorWrappingScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <MainScreenNavigator navigation={this.props.navigation}/>
      </View>
    );
  }
}
NavigatorWrappingScreen.router = MainScreenNavigator.router;


export const AppNavigator = StackNavigator({
	WelcomeScreen: {
		screen: WelcomeScreen
	},
  TabScreen: {
    screen: NavigatorWrappingScreen
  },
  DetailsScreen: {
    screen: DetailsScreen,
  },
  TempScreen: {
    screen: TempScreen
  },
  Temp2Screen: {
    screen: Temp2Screen
  },
  ArticleListScreen: {
    screen: ArticleListScreen
  },
  WeatherScreen: {
    screen: WeatherScreen
  },
  ProgressViewScreen: {
    screen: ProgressViewScreen
  },
  WeatherWebScreen: {
    screen: WeatherWebScreen
  }
},{
  mode: 'card',
  headerMode: 'float',
  navigationOptions: {
    headerTitleAllowFontScaling: false,
    headerStyle: {
      height: 20+44,         // iPhone x  44 + 44,
      paddingTop: 20,     // iPhone x  44
      // borderBottomColor: 'red',
      borderBottomWidth:0,
      backgroundColor: 'orange'
    }
  }
});