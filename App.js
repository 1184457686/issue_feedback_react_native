import React, { Component } from 'react'
import {
  Text,
  View,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
var Login = require('./src/Home/login').default;
var User =require('./src/User/User').default;
var registe = require('./src/Home/registe').default;
var manager= require('./src/Manager/manager').default;
const Stack = createStackNavigator();
class App extends Component {
  render() {
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="登录"  headerMode="none">
        <Stack.Screen name="登录" component={Login} />
        <Stack.Screen name="注册" component={registe} />
        <Stack.Screen name="管理员" component={manager} />
        <Stack.Screen name="用户" component={User} />
      </Stack.Navigator>
    </NavigationContainer>
    )
  }
}

export default App;