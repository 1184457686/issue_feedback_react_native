import React, { Component } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'



var newpage = require('./newpage').default;
var feedback = require('./feedback').default;
var mine = require('./mine').default;

const Tab = createBottomTabNavigator();


export default class User extends Component {
    render() {
        return (
            <Tab.Navigator
                lazy={false}
            // screenOptions={({route})=>({
            //     tabBarIcon:(()=>{
            //         if(route.name==="浏览"){
            //             <Ionicons name={route.name} />
            //         }else if(route.name==="反馈"){

            //         }else if(route.name==="个人中心"){

            //         }
            //     })
            // })}
            >
                <Tab.Screen name="浏览" component={newpage} />
                {/* <Tab.Screen name="反馈" component={feedback} /> */}
                <Tab.Screen name="个人中心" component={mine} />
            </Tab.Navigator>
        )
    }
}
