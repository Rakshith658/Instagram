import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { View, Text,StyleSheet,ActivityIndicator } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { firebase } from '@firebase/app';

import Landing from './components/auth/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import MainScreen from './components/main'
import Add from './components/main/Add'
import Save from './components/main/Save'


import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers/index'
import thunk from 'redux-thunk'
const store = createStore(rootReducer,applyMiddleware(thunk))

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDY25vVo8H5k2xtaFNNK4DSZmFhcvMsCBc",
  authDomain: "instagram-3ee4c.firebaseapp.com",
  projectId: "instagram-3ee4c",
  storageBucket: "instagram-3ee4c.appspot.com",
  messagingSenderId: "167238038889",
  appId: "1:167238038889:web:7f798a05222869e9e3b9f8",
  measurementId: "G-P5XFG51VWW"
};


firebase.initializeApp(firebaseConfig)


const Stack = createStackNavigator();





export default class App extends Component {
   constructor(props) {
    super()
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center',alignItems:'center' }}>
          <ActivityIndicator/>
          <Text>Loading....</Text>
        </View>
      )
    }


    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Add" component={Add} navigation={this.props.navigation} />
            <Stack.Screen name="SaveScreen" component={Save} navigation={this.props.navigation}/>
          </Stack.Navigator> 
        </NavigationContainer>  
      </Provider>
    )
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
