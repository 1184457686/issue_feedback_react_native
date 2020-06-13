import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native'

import { navigation } from "@react-navigation/native"
import { createStackNavigator} from "@react-navigation/stack"
import Ioncons from "react-native-vector-icons"

const products  = require('./Products').default
const  CreateProduct = require('.//CreateProduct').default
const TagPortion = require("./TagPortion").default
const Stack = createStackNavigator();


export default class discussion extends Component {
    render() {
        const { navigation } = this.props
        return (
            // <View>
            //     <TouchableOpacity 
            //     style={styles.create}
            //     onPress={() => navigation.navigate('反馈管理')}
            //     >
            //         <Text style={{ color:"red"}}>创建产品</Text>
            //     </TouchableOpacity>
            // </View>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="产品管理" component={products} />
                <Stack.Screen name="创建产品" component={CreateProduct} />
                <Stack.Screen name="添加标签" component={TagPortion} />
            </Stack.Navigator>
        )
    }
}

