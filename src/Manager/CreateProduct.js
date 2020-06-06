import React, { Component } from 'react'
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ImageBackground,
    Dimensions
} from 'react-native'

import Request from '../../api/Request'
import DeviceStorage from '../../api/DeviceStorage'
import { NavigationContainer } from '@react-navigation/native'

var { width, height } = Dimensions.get("window")
export default class Avatar extends Component {
    state = {
        name: "",
        description: ""
    }

    checkcontainer = () => {
        const { name } = this.state
        if (name == '') {
            Alert.alert("请填写产品名称")
        } else {
            this.createProduct();
        }
    }
    createProduct = async () => {
        const { navigation } = this.props;
        const token = await DeviceStorage.get('Token')
        const manager_id = await DeviceStorage.get("id")

        const data = {
            "manager_id": manager_id,
            "name": this.state.name,
            "description": this.state.description
        }
        Request('/service/v1/product', data, "POST", token)
            .then(res => {
                if (res.ok) {
                    Alert.alert("创建成功")
                    navigation.navigate("产品管理")
                } else {
                    const err = res.message;
                    Alert.alert(err)
                }
            })

    }

    render() {
        return (
            <ImageBackground
                source={require("../../resource/CreateProduct.jpg")}
                style={styles.backgroud}>
                <View style={styles.container}>
                    <View style={styles.CreateView}>
                    <TextInput style={styles.inputboxName}
                        placeholder={'产品名称'}
                        contextMenuHidden={true}
                        onChangeText={(value) => {
                            this.setState({
                                name: value
                            })
                        }}
                    />
                    <TextInput
                        style={styles.inputboxdecription}
                        placeholder={'产品描述'}
                        contextMenuHidden={true}
                        onChangeText={(value) => {
                            this.setState({
                                description: value
                            })
                        }}
                    />
                    <TouchableOpacity
                        style={styles.click}
                        onPress={() => this.checkcontainer()}
                    >
                        <Text>创建产品</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    backgroud: {
        width: width,
        height: height,
        // justifyContent: 'center'
    },
    container: {
        flexDirection: 'column',

        // backgroundColor: 'white',
        opacity: 0.6
    },
    CreateView:{
        flexDirection:"column",
        alignItems: "center",
    },
    inputboxName:{
        height: 38,
        width: width,
        height: 50,
        backgroundColor: "white",
        marginBottom: 5,
        //n内容居中
        textAlign: "center",
        borderColor: 'red',
        textAlign:"left"
    },
    inputboxdecription:{
        height:300,
        width: width,
        backgroundColor: "white",
        marginBottom: 5,
        //n内容居中
        textAlign: "center",
        borderColor: 'red',
        textAlignVertical: 'top',
        textAlign:"left"
    },
    click: {
        height: 35,
        width: 300,
        backgroundColor: "blue",
        marginTop: 30,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    
    
    
})
