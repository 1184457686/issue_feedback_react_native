import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Alert,
    RefreshControl,
    ScrollView,
} from 'react-native'

import { navigation } from "@react-navigation/native"
import { Picker } from "@react-native-community/picker"

import BaseRequest from '../../api/BaseRequest'
import Request from '../../api/Request'
import DeviceStorage from '../../api/DeviceStorage';
import AsyncStorage from '@react-native-community/async-storage'

var { width, height } = Dimensions.get("window");


export default class discussions extends Component {
    state = {
        products: [],
        hidden: true,
        style: styles.create
    }
    //查询产品
    getProduct = async () => {
        const user_id = await DeviceStorage.get("id")
        const url = "/service/v1/product/manager/" + user_id
        const res = await BaseRequest(url, "GET")
        res.ok ?
            this.setState({
                products: res.result.products,
            })
            :
            console.log(res)
    }
    //产品列表
    _PickerList = () => {
        const {navigation} =this.props
        const Pickers = []
        const Views = []
        const { products } = this.state
        for (let i = 0; i < products.length; i++) {
            var name = products[i].name

            Pickers.push(
                <TouchableOpacity 
                key={i} style={styles.product}
                onPress={()=>{
                    navigation.navigate("添加标签")
                    AsyncStorage.setItem("product_id",products[i].product_id)
                }}
                >
                    <Text >{name}</Text>
                    <TouchableOpacity
                        style={{ position: "absolute", right: 10, top: 6 }}
                        onPress={() => {
                            AsyncStorage.setItem("product_id", products[i].product_id)
                            Alert.alert("提示", "确定删除该产品?",
                                [
                                    { text: "确定", onPress: () => this._delete() },
                                    { text: "" },
                                    { text: "取消" }
                                    // { text: 'OK', onPress: () => console.log('OK Pressed') },
                                ]
                            )
                        }}
                    >
                        <Text>×</Text>
                    </TouchableOpacity>
                </TouchableOpacity>

            )
        }

        return (
            <View style={{ alignItems: "center" }}>
                {Pickers}
            </View>
        )

    }
    //删除产品
    _delete = async () => {
        const token = await DeviceStorage.get("Token")
        const manager_id = await DeviceStorage.get("id")
        const product_id = await DeviceStorage.get("product_id")
        const url = "/v1/product/" + product_id
        const data = {
            "manager_id": manager_id
        }
        // console.log(token)
        const res = await Request(url, data, "DELETE", token)

        if (res.ok) {
            this.setState({
                hidden: false
            })
            setTimeout(() => {
                this.setState({
                    hidden: true
                })
            }, 1500)
        } else {
            console.log(res)
        }

    }
    //延迟执行
    // delay=()=>{

    // }
    //操作提示
    prompt = () => {
        const { hidden } = this.state
        if (hidden) {
            return;
        } else {
            return (
                <Text style={{ position: "absolute", left: width * 5 / 12, top: height * 3 / 4, opacity: .5 }}>删除成功</Text>
            )
        }
    }
    componentDidMount() {
        this.getProduct()
    }
    componentDidUpdate() {
        this.getProduct()
        this.prompt()
    }
    componentWillUnmount() {
        if (this.state.hidden) {
            this.prompt()
        }
    }
    render() {
        const { navigation } = this.props;
        return (
            <View >
                <TouchableOpacity
                    style={styles.create}
                    onPress={() => navigation.navigate('创建产品')}
                // onPress={() => {
                //     console.log(this.state.style)
                // }}
                >
                    <Text style={{ color: "red" }}>创建产品</Text>
                </TouchableOpacity>
                {this._PickerList()}
                {this.prompt()}

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
    },
    product: {
        flexDirection: "row",
        width: width * 7 / 8,
        height: 30,
        backgroundColor: "red",
        justifyContent: 'center',
        borderWidth: 1,
        alignItems: "center",
        borderStyle: "solid",
        borderRadius: 10,
        borderColor: "blue"
    },
    delete: {
        // alignItems: "center",
        // justifyContent:"center"
    }
})
