import React, { Component } from 'react'
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Dimensions,
    Button,
    TouchableOpacity
} from 'react-native'

var {height,width}=Dimensions.get('window');
class login extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const { navigation } = this.props;
        return (
            <View style={{ backgroundColor: 'Silver',width:width,height:height,justifyContent:'center'}}>
                <View style={styles.loginView}>
                    <Text style={{fontSize:30}}>信息反馈系统</Text>
                    <View style={styles.login}>
                        <TextInput placeholder={'请输入账号'} style={styles.loginText}/>
                        <TextInput placeholder={'请输入密码'} style={styles.loginText} secureTextEntry />
                    </View>
                       <TouchableOpacity
                       activeOpacity={0.1}
                        style={styles.loginBthStyle}
                        onPress={()=>navigation.navigate('用户')}
                        >
                           <Text>登录</Text>
                       </TouchableOpacity>
                     <TouchableOpacity
                    onPress={()=>navigation.navigate('注册')}
                     
                     >
                         <Text style={{color:"red"}}>立即注册</Text>
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



export default login;