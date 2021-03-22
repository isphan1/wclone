import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, View, Text } from 'react-native';
import Colors from '../constants/Colors';
import { Octicons,MaterialCommunityIcons } from '@expo/vector-icons';
import AuthContext from '../data/AuthContext'

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import MainTabNavigator from './MainTabNavigator';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import ChatRoomTitle from '../components/ChatRoomTitle';
import ContactScreen from '../screens/ContactScreen';
import LoginScreen from '../screens/LoginScreen';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      // linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {

  const {singOut} = React.useContext(AuthContext)

  return (
    <Stack.Navigator screenOptions={{
        headerStyle:{
          backgroundColor:Colors.light.tint,
          shadowOpacity:0,
          elevation:0,
        },
        headerTintColor:Colors.light.background,

    }}>
      <Stack.Screen 
        name="Root"
        options={{
          title:"",
          headerLeft:()=>(
            <View style={{
              display:"flex",
              flexDirection:"row",
              alignItems:"center",
              marginLeft:15
            }}
            >
              <Text style={{
                fontSize:20,
                color:"#fff"
              }}>MyChat</Text>
            </View>
          ),
          headerRight:() => (
            <View style={{
              display:"flex",
              flexDirection:"row",
              width:60,
              justifyContent:"space-between",
              marginRight:10
            }}>
                <Octicons name="search" size={24} color="#fff"/>
                <MaterialCommunityIcons                           
                  onPress={singOut}
                  name="dots-vertical" size={24} color="#fff" /> 
            </View>
          )
        }}
        component={MainTabNavigator} 
      />
      <Stack.Screen 
        name="NotFound" 
        component={NotFoundScreen} 
        options={{ title: 'Oops!' }} 
      />
      <Stack.Screen 
        name="ChatRoom" 
        component={ChatRoomScreen} 
        options={({route})=>({
          title:"",
          headerLeft:()=> <View style={{
            flex:1,
            alignItems:"center",
            justifyContent:"center"
            
            }}>
            <ChatRoomTitle ChatRoom={route.params.chatList} msgRef={route.params.msgRef} />
          </View>,
          headerRight:()=>
                      <View style={{
                        flexDirection:"row",
                        width:100,
                        justifyContent:"space-between",
                        marginRight:10
                      }}>
                        <MaterialCommunityIcons name="video" size={24} color="#fff" /> 
                        <MaterialCommunityIcons name="phone" size={24} color="#fff" /> 
                        <MaterialCommunityIcons name="dots-vertical" size={24} color="#fff" /> 
                      </View>
        })} 
      />
      <Stack.Screen 
        name="Contacts" 
        component={ContactScreen} 
        options={{ title: 'Contact list' }} 
      />
    </Stack.Navigator>
  );
}
