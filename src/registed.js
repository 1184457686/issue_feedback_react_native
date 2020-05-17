import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();
var width = Dimensions.get('screen').width;
var height = Dimensions.get('screen').height;
export default class registe extends Component {
    render() {
        return (
            <View style={{ backgroundColor: 'Silver', width: width, height: height, justifyContent: 'center' }}>
                <View style={styles.loginView}>
                    <Text style={{ fontSize: 30 }}>注册</Text>
                    <View style={styles.login}>
                        <TextInput placeholder={'请输入账号'} style={styles.loginText} />
                        <TextInput placeholder={'请输入密码'} style={styles.loginText} secureTextEntry />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.1}
                        style={styles.loginBthStyle}
                       
                    >
                        <Text>注册</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    loginView: {
        flexDirection: 'column',
        alignItems: "center",
        
        backgroundColor:'white',
        opacity:0.6

    },
    login: {
        borderColor: 'red'
    },
    loginText: {
        height:38,
        width:width,
        height:50,
        backgroundColor:"white",
        marginBottom:5,
        //n内容居中
        textAlign:"center",
        borderColor:'red'
    },
    loginBthStyle: {
        height: 35,
        width: 300,
        backgroundColor: "blue",
        marginTop: 30,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    }
})