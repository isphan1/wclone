import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react'

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { createStackNavigator } from '@react-navigation/stack';
import ContactScreen from './screens/ContactScreen';
import { NavigationContainer} from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import AuthContext from './data/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Provider } from "react-redux";
import { io } from 'socket.io-client'

import { store } from "./redux/store";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const authContext = React.useMemo(()=>{
    return{
      singIn:()=>{
        setAuth(true)
      },
      singOut:async()=>{
        await AsyncStorage.clear()
        setAuth(false)
      },
      ioRef:()=>{
        const msgRef = React.useRef(io("ws://127.0.0.1:12000/"))
        return msgRef
      }
    }
  });
  
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('id')
      if(value !== null){
        setAuth(true)
      }
    } catch(e) {
      // error reading value
    }
  }

  React.useEffect(()=>{
    getData()
  })

  const [auth,setAuth] = React.useState(false)

  const Stack = createStackNavigator()

  if (!auth) {
    return (
      <Provider store={store}>
      <AuthContext.Provider value={authContext}>
      <SafeAreaProvider>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle:{
          backgroundColor:"#1D4354",
          shadowOpacity:0,
          elevation:0,
          // height:0
        },
        headerTintColor:"#fff",

    }}>
        {/* <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={({route})=>({
            title:"login",
          })} 
        /> */}
        <Stack.Screen name="Login"
        options={{
          title:"MyChat"
        }}
        >
          {props => <LoginScreen {...props} setAuth={setAuth} auth={auth}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    <StatusBar />
    </SafeAreaProvider>
    </AuthContext.Provider>
    </Provider>
    )
}
else {
    return (
      <Provider store={store}>
      <AuthContext.Provider value={authContext}>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
      </AuthContext.Provider>
      </Provider>
    );
}
}

export default App
