import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Alert,
    ImageBackground
} from 'react-native'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Request from '../api/Request';
import { Value } from 'react-native-reanimated';
import AsyncStorage from '@react-native-community/async-storage'
import DeviceStorage from '../api/DeviceStorage'
var width = Dimensions.get('screen').width;
var height = Dimensions.get('screen').height;

export default class registe extends Component {
    state = {
        email: '',
        password: '',
        validateToken: '',
        validateCode: ''
    }
    getCaptcha = async () => {
        const data = {
            'account_id': this.state.email,
        }

        const res = await Request('/service/v1/account/send_code', data, 'post')
        if (res.ok) {
            Alert.alert(res.result.validate_code)
            AsyncStorage.setItem('validateCode', res.result.validate_code)
            AsyncStorage.setItem('validateToken', res.result.validate_token)
        } else {
            const error = res.message
            Alert.alert(error)
        }
    }
    RegisteAccount = async () => {
        const { navigation } = this.props;
        const Code = await DeviceStorage.get('validateCode')
        const token = await DeviceStorage.get('validateToken')
        const data = {
            'account_id': this.state.email,
            'password': this.state.password,
            'validate_code': this.state.validateCode,
            'validate_token': token

        }
        Request('/service/v1/account', data, 'POST',)
            .then(res => {
                if (res.ok) {
                    Alert.alert('注册成功！')
                    navigation.navigate('登录')
                 } else {
                    // const error = res.errors.message
                    Alert.alert("123")
                }
            })

    }

    checkInput = () => {
        const { email, password, validateCode } = this.state;
        if (email == '' || password == '' || validateCode == '') {
            Alert.alert("邮箱、密码和验证码不能为空");
        }
        else {
            this.RegisteAccount();
        }

    }

    render() {
        const { navigation } = this.props;
        const { email, password } = this.state;
        return (
            // <View style={{ backgroundColor: 'DimGray', width: width, height: height, justifyContent: 'center' }}>
            <ImageBackground source={require('../resource/login.jpg')} style={{ width: width, height: height, justifyContent: 'center' }}>
                <View style={styles.loginView}>
                    <Text style={{ fontSize: 30 }}>注册</Text>
                    <View style={styles.login}>
                        <TextInput
                            placeholder={'请输入邮箱'}
                            visible-password={email}
                            style={styles.loginText}
                            onChangeText={(value) => {
                                this.setState({
                                    email: value
                                })
                            }}
                        />
                        <TextInput
                            placeholder={'请输入密码'}
                            style={styles.loginText}
                            visible-password={password}
                            secureTextEntry={true}
                            onChangeText={(value) => {
                                this.setState({
                                    password: value
                                })
                            }}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                placeholder={'请输入验证码'}
                                style={styles.Captcha}
                                onChangeText={(value) => {
                                    this.setState({
                                        validateCode: value
                                    })
                                }}
                            />
                            <TouchableOpacity
                                activeOpacity={0.1}
                                style={styles.getCaptcha}
                                onPress={() => this.getCaptcha()}
                            >
                                <Text>获取验证码</Text>

                            </TouchableOpacity>
                        </View>
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
                        <Text style={{ color: 'rgb(31,199,253)' }}>已有账号?返回登录</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({

    loginView: {
        flexDirection: 'column',
        alignItems: "center",
        // backgroundColor: 'rgb(245,245,245)',
        opacity: 0.6,
        height: 325
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
    Captcha: {
        width: width / 9 * 4,
        height: 50,
        // backgroundColor: "white",
        marginBottom: 5,
        //n内容居中
        textAlign: "center",
        borderColor: 'red',
        backgroundColor: "white",

    },
    getCaptcha: {
        width: width / 9 * 4,
        height: 50,
        backgroundColor: 'rgb(134,223,251)',
        marginBottom: 20,
        marginLeft: width / 9,
        justifyContent: "center",
        alignItems: "center",

    },
    loginBthStyle: {
        height: 35,
        width: 300,
        backgroundColor: "blue",
        marginTop: 25,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
})