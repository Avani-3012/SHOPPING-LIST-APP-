import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import EnterItemsScreen from '../screens/EnterItemsScreen'
import ViewItemsScreen from '../screens/ViewItemsScreen'


export const AppTabNavigator = createBottomTabNavigator({
  EnterItems : {
    screen: EnterItemsScreen,
    navigationOptions :{
      tabBarLabel : "Enter Items",
    
      tabBarIcon : <Image source={require("../assets/shoppingList.png")} style={{width:40, height:40}}/>,
      
    }
  },
  ViewItems: {
    screen: ViewItemsScreen,
    navigationOptions :{
      tabBarLabel : "View Items",
      tabBarIcon : <Image source={require("../assets/ViewItems.jpg")} style={{width:40, height:40}}/>,
    }
  }
});

