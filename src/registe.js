import React, { Component } from 'react'
import {
    Dimensions
} from 'react-native'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();
var registed = require('./registed').default;


export default class registe extends Component {
    render() {
        return (
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="registe" component={registed} />
            </Stack.Navigator>
        )
    }
}
