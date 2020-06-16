import React, { Component } from 'react'
import {
    Text,
    View,
    RefreshControl,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Alert,
    ImageBackground
} from 'react-native'
import { Picker } from "native-base"
import BaseRequest from "../../api/BaseRequest"
import DeviceStorage from "../../api/DeviceStorage"
import { PinchGestureHandler } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

var { width } = Dimensions.get("window")
var { height } = Dimensions.get("window")



export default class vote extends Component {
    state = {
        refreshing: false,
        products: [],
        index: 0,
        feedbacks: [],
        position: 0
    }

    //获取所有产品
    getProduct = async () => {
        const res = await BaseRequest("/service/v1/products", "GET")
        res.ok ?
            this.setState({
                products: res.result.products,
            })
            :
            console.log(res)
    }
    //获取特定产品下的反馈
    _getfeedback = async () => {
        const index = this.state.index
        const product_id = this.state.products[index].product_id
        AsyncStorage.setItem("product_id", this.state.products[index].product_id)
        // console.log(product_id)
        const url = "/service/v1/issue/product/" + product_id + "?status=opening"
        const res = await BaseRequest(url, "GET")
        // console.log(res)
        // console.log(res.result.issues[0])
        res.ok ?
            this.setState({
                feedbacks: res.result.issues,
            }) :
            console.log(res)

        // console.log(this.state.feedbacks)
    }
    //列表
    _PickerList = () => {
        const Pickers = []
        const Views = []
        const { products,index} = this.state
        for (let i = 0; i < products.length; i++) {
            var name = products[i].name
            Pickers.push(
                <Picker.Item label={name} value={i} key={i} />
            )
        }

        return (
            <Picker
                mode="dropdown"
                selectedValue={index}
                onValueChange={(index) => {
                    this.setState({
                        index: index
                    })
                    AsyncStorage.setItem("product_id", products[index].product_id)
                    AsyncStorage.setItem("manager_id", products[index].manager_id)

                }
                }
            >
                {Pickers}
            </Picker>

        )

    }

    //展示特定产品下的反馈
    _ScreenView = () => {
        // console.log(this.state.feedbacks.length)
        const Views = []
        const { feedbacks } = this.state
        const { navigation } = this.props
        for (let i = 0; i < feedbacks.length; i++) {
            var title = feedbacks[i].title
            var description = feedbacks[i].description
            Views.push(
                // <View key={i} style={{ width: width, height: 60, flexDirection: "row", backgroundColor: "res", }}>
                <TouchableOpacity
                key={i}
                style={{ marginTop: 10, backgroundColor: "rgb(171,220,235)" }}
                onPress={() => {
                    AsyncStorage.setItem("issue_id",feedbacks[i].issue_id)
                    // console.log(typeof(feedbacks[i].issue_id))
                    this.setState({
                        position: i
                    }, () => {
                        AsyncStorage.setItem("index", this.state.position.toString())
                    }
                    )
                    navigation.navigate("反馈详情")
                }}
            >
                <View style={styles.feedbackstyle}>
                    <Image source={require("../../resource/head.png")} style={{ width: 60, height: 60, marginLeft: 15 }} />
                    <View style={styles.right}>
                        <Text >{title}</Text>
                        <Text>{description}</Text>
                    </View>
                    <View>

                    </View>
                </View >
            </TouchableOpacity>
            )
        }

        // console.log(Views.length)
        return (
            <ScrollView style={{ height: height - 100 }} >
                {Views}
            </ScrollView>


        )


    }

    componentDidMount() {
        this.getProduct()
        // this._getfeedback()
    }
    //待修改 componentDidUpdate()里面不能存在setstate  否则会无限调用
    componentDidUpdate() {
        this._getfeedback()
        this._ScreenView()
    }
    render() {
        const { navigation } = this.props
        return (
            <ImageBackground source={require("../../resource/FeedbackList.jpg")} style={{ width: width, height: height }} >
                {/* <View> */}
                <Image
                    source={require("../../resource/feedback.jpg")}
                    style={{ width: width, height: 100 }}
                />
                {this._PickerList()}
                {this._ScreenView()}
                <TouchableOpacity
                    style={styles.addfeedback}
                    onPress={() => {
                        navigation.navigate("反馈")
                        // console.log(keys)
                        // this.getFeedback()
                        // this._getfeedback()
                        // this._ScreenView()
                    }}
                >
                    <Image
                        source={require("../../resource/AddFeedBack.png")}
                        style={{ width: 50, height: 50 }}
                    />
                    {/* <Text>123</Text> */}
                </TouchableOpacity>
                {/* </View> */}
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({

    addfeedback: {
        position: "absolute",
        right: 30,
        top: height - 150,
        shadowOffset: {
            width: 2,
            height: 10
        }

    },
    feedbackstyle: {
        width: width,
        height: 60,
        flexDirection: "row",

    },
    right: {
        marginLeft: 10,
        marginTop: 10
    }
})

