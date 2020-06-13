import React, { Component } from 'react'
import { Text, View } from 'react-native'

import { createDrawerNavigator } from '@react-navigation/drawer'
import {createStackNavigator} from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import Demand from './Demand'
// import Avatar from './Avatar'
// import discussion from './discussion'
const Manage = require('./Mange').default
const Avatar = require('./CreateProduct').default
const mine = require('./mine').default
const drawer = createDrawerNavigator();
const Tab =createBottomTabNavigator()


class manager extends Component {
    render() {
        return (
            <Tab.Navigator initialRouteName="管理">
                <Tab.Screen name="管理" component={Manage} />
                <Tab.Screen name="我的" component={mine}/>
            </Tab.Navigator>
          
            // 
        )
    }
}
export default manager;
