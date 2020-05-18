import React, { Component } from 'react'
import { Text, View } from 'react-native'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'


var Looking =require('./Looking').default;
var feedback =require('./feedback').default;
const Tab = createBottomTabNavigator();
export default class User extends Component {
    render() {
        return (     
               <Tab.Navigator
               lazy={false}
               >
                   <Tab.Screen name="浏览"  component={Looking} />
                   <Tab.Screen name="反馈"  component={feedback}/>
               </Tab.Navigator>
        )
    }
}
