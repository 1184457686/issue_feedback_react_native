import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Alert
} from 'react-native'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Request from '../api/Request';
import { Value } from 'react-native-reanimated';
var width = Dimensions.get('screen').width;
var height = Dimensions.get('screen').height;
export default class registe extends Component {
    state = {
        email: '',
        password: ''
    }
    RegisteAccount = () => {
        const data = {
            'account_id': this.state.email,
            'password': this.state.password
        }

        Request('/1/account', data, 'POST')
            .then(res => {
                if (res.ok) {
                    Alert.alert('注册成功！')
                    navigation.navigator('登录')
                } else {
                    const error = res.error_type == undefined ? '邮箱格式错误' : res.message
                    Alert.alert(error)
                }
            })
    }
    checkInput = () => {
        var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        const { email, password } = this.state;
        if (email == '' || password == '') {
            Alert.alert("邮箱或密码不能为空");
        } else if (!email.match(pattern) || password.match()) {
            Alert.alert("邮箱格式不正确")
        }
        else {
            this.RegisteAccount();
        }

    }

    render() {
        const { navigation } = this.props;
        const { email, password } = this.state;
        return (
            <View style={{ backgroundColor: 'Silver', width: width, height: height, justifyContent: 'center' }}>
                <View style={styles.loginView}>
                    <Text style={{ fontSize: 30 }}>注册</Text>
                    <View style={styles.login}>
                        <TextInput
                            placeholder={'请输入邮箱'}
                            visible-password={email}
                            style={styles.loginText}
                            onChangeText={value => {
                                this.setState = {
                                    email: value
                                }
                            }}
                        />
                        <TextInput
                            placeholder={'请输入密码'}
                            style={styles.loginText}
                            secureTextEntry={true}
                            onChangeText={(value) => {
                                this.setState = {
                                    password: value
                                }
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.1}
                        style={styles.loginBthStyle}
                        // onPress={()=>this.checkInput()}
                        onPress={() => this.checkInput()}
                    >
                        <Text>注册</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.1}
                        onPress={() => navigation.navigate('登录')}

                    >
                        <Text>已有账号?返回登录</Text>
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

        backgroundColor: 'white',
        opacity: 0.6

    },
    login: {
        borderColor: 'red'
    },
    loginText: {
        height: 38,
        width: width,
        height: 50,
        backgroundColor: "white",
        marginBottom: 5,
        //n内容居中
        textAlign: "center",
        borderColor: 'red'
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