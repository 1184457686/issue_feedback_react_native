import React, { Component } from 'react'
import { Text, View } from 'react-native'

import { createDrawerNavigator } from '@react-navigation/drawer'
import {createStackNavigator} from '@react-navigation/stack'
// import Demand from './Demand'
// import Avatar from './Avatar'
// import discussion from './discussion'
const FeedbackManage = require('./FeedbackManage').default
const Avatar = require('./CreateProduct').default
const discussion = require('./discussion').default
const drawer = createDrawerNavigator();


class manager extends Component {
    render() {
        return (
            <drawer.Navigator initialRouteName="反馈管理">
                <drawer.Screen name="反馈管理" component={FeedbackManage} />
                <drawer.Screen name="产品管理" component={discussion} />
            </drawer.Navigator>
          
            // 
        )
    }
}
export default manager;
