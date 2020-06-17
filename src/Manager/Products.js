import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Alert,
    Image,
    TextInput
} from 'react-native'

import { navigation } from "@react-navigation/native"

import BaseRequest from '../../api/BaseRequest'
import Request from '../../api/Request'
import DeviceStorage from '../../api/DeviceStorage';
import AsyncStorage from '@react-native-community/async-storage'

var { width, height } = Dimensions.get("window");


export default class discussions extends Component {
    state = {
        products: [],
        hidden: true,
        style: styles.create,
        remove: true,
        newname: "",
        newdescription: "",

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
        const { navigation } = this.props
        const Pickers = []
        const Views = []
        const { products } = this.state
        for (let i = 0; i < products.length; i++) {
            var name = products[i].name

            Pickers.push(
                <TouchableOpacity
                    key={i} style={styles.product}
                    onPress={() => {
                        navigation.navigate("添加标签")
                        AsyncStorage.setItem("product_id", products[i].product_id)
                    }}
                >
                    <Text >{name}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            AsyncStorage.setItem("product_id", products[i].product_id)
                            this.setState({
                                remove: false
                            })
                        }}
                    >
                        <Image source={require("../../resource/AddTag.png")} style={{ width: 13, height: 13, margin: 5 }} />
                    </TouchableOpacity>

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

    //产品信息修改页面
    UpdateProductView = () => {
        if (this.state.remove) {
            return;
        } else {
            return (
                <View style={{
                    width: width * 15 / 16, height: height / 3 + 50, marginTop: 10, marginLeft: 0, backgroundColor: "gray", opacity: .9,
                position: "absolute", left: width / 32, top: height / 4
                }}

                    key={1}>
                    <View>
                        <TextInput
                            style={{ width: width * 14 / 16, marginLeft: 5, marginTop: 5, textAlignVertical: 'top', borderRadius: 5, borderColor: "white", borderStyle: "solid", borderWidth: 1 }}
                            onChangeText={(value) => {
                                this.setState({
                                    newname: value
                                })

                            }}
                        />
                        <TextInput
                            style={{ width: width * 14 / 16, height: height / 5, marginLeft: 5, textAlignVertical: 'top', borderRadius: 5, borderColor: "white", borderStyle: "solid",  borderWidth: 1 }}
                            multiline={true}
                            onChangeText={(value) => {
                                this.setState({
                                    newdescription: value
                                })

                            }}
                        />
                    </View>

                    <TouchableOpacity
                        style={{
                            width: width / 2,
                            height: 35,
                            borderRadius: 20,
                            alignSelf: 'center',
                            backgroundColor: 'skyblue',
                            marginTop: 20,
                            justifyContent: 'center',
                            alignItems: 'center'//显示Text组件居中}}
                        }}
                        onPress={() => {
                           
                            if(this.state.newname==""){
                                Alert.alert("名字不能为空")
                            }else{
                                this.UpdateProduct()
                                this.setState({
                                    remove: true
                                })
                            }
                           
                        }}
                    >
                        <Text>确定</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
    //产品信息更新
    UpdateProduct = async () => {
        const manager_id = await DeviceStorage.get("id")
        const product_id = await DeviceStorage.get("product_id")
        console.log(product_id)
        const token = await DeviceStorage.get("Token")
        const url = "/v1/product/" + product_id
        const data = {
            "manager_id": manager_id,
            "name": this.state.newname,
            "description": this.state.newdescription,
        }

        const res = await Request(url, data, "PUT", token)
        console.log(res)
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
        if (!this.state.remove) {
            this.UpdateProductView()
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
                {this.UpdateProductView()}
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
