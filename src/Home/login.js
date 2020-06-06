import React, { Component } from 'react'
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Alert,
    ImageBackground
} from 'react-native'
var { height, width } = Dimensions.get('window');
import Request from '../../api/Request';
import AsyncStorage from '@react-native-community/async-storage'
import DeviceStorage from '../../api/DeviceStorage';

class login extends Component {
    state = {
        email: '',
        password: '',
    }
    loginRequest = () => {
        const { navigation } = this.props;
        const data = {
            "account_id": this.state.email,
            "password": this.state.password,
        }
        Request('/v1/login', data, 'POST')
            .then(res => {
                if (res.ok) {
                    const token = res.result.token
                    const id = res.result.user_id
                    AsyncStorage.setItem('Token', token)
                    AsyncStorage.setItem('id', id)

                    switch (res.result.role_id) {
                        case "USER":
                            navigation.navigate('用户')
                            break;
                        case "MANAGER":
                            navigation.navigate('管理员')
                            break;
                        case "DEVELOPER":
                            navigation.navigate('开发人员')
                            break;
                    }
                } else {
                    const error = res.message
                    Alert.alert(error)
                }
            })
    }
    checklogin = () => {
        const { email, password } = this.state;
        if (email == '' || password == '') {
            Alert.alert("邮箱或密码不能为空");
        }
        else {
            this.loginRequest();
        }
    }
    render() {
        const { navigation } = this.props;

        return (
            // <View style={{ backgroundColor: 'Silver', width: width, height: height, justifyContent: 'center', }}>
            <ImageBackground source={require('../../resource/login.jpg')} style={{ width: width, height: height, justifyContent: 'center' }}>
                <View style={styles.loginView}>
                    <Text style={{ fontSize: 30 }}>信息反馈系统</Text>
                    <View style={styles.login}>
                        <TextInput
                            placeholder={'请输入邮箱'}
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
                            secureTextEntry={true}
                            contextMenuHidden={true}
                            onChangeText={(value) => {
                                this.setState({
                                    password: value
                                })
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.1}
                        style={styles.loginBthStyle}
                        // onPress={() => this.checklogin()}
                        // onPress={() => navigation.navigate('管理员')}
                        onPress={() => navigation.navigate('用户')}
                    >
                        <Text>登录</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('注册')}

                    >
                        <Text style={{ color: "red" }}>立即注册</Text>
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

        // backgroundColor: 'white',
        opacity: 0.6

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



export default login;