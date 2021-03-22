import { Fontisto, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ChatScreen from '../screens/ChatScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { MainTabParamList} from '../types';

const Tab = createMaterialTopTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      initialRouteName="Chats"
      tabBarOptions={{
        activeTintColor:Colors[colorScheme].background,
        style:{
          backgroundColor:Colors[colorScheme].tint
        },
        indicatorStyle:{
          backgroundColor:Colors[colorScheme].background,
          height:5
        },
        labelStyle:{
          fontWeight:'bold'
        },
        showIcon:true
      }}
    >
    <Tab.Screen 
      name="Camera" 
      component={TabOneScreen}
      options={{
        tabBarIcon:({color:string}) => <Fontisto name="camera" color="#fff" size={18}/>,
        tabBarLabel:()=>null
      }} 
    />
    <Tab.Screen name="Chats" component={ChatScreen} />
    <Tab.Screen name="Status" component={TabOneScreen} />
    <Tab.Screen name="Calls" component={TabTwoScreen} />
  </Tab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/