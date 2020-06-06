import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Alert,
    RefreshControl,
    ScrollView
} from 'react-native'

import { navigation } from "@react-navigation/native"

import Request from '../../api/Request'
import DeviceStorage from '../../api/DeviceStorage';

var { width } = Dimensions.get("window");


export default class discussions extends Component {


    render() {
        const { navigation } = this.props;
        return (
            <View >
                <TouchableOpacity
                    style={styles.create}
                    onPress={() => navigation.navigate('创建产品')}
                // onPress={() => this.getproduct()}
                >
                    <Text style={{ color: "red" }}>创建产品</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    create: {
        height: 35,
        width: 100,
        backgroundColor: 'rgb(134,223,251)',
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 4,
        shadowOpacity: .5,
        opacity: .7,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: width - 100
    }
})
