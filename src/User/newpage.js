import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack=createStackNavigator();
var Looking =require( "./Looking").default
var feedback = require('./feedback').default;
export default class newpage extends Component {
    render() {
        return (
           <Stack.Navigator headerMode="none">
               <Stack.Screen name="浏览" component={Looking} />
               <Stack.Screen name="反馈" component={feedback} />
               
           </Stack.Navigator>
        )
    }
}
