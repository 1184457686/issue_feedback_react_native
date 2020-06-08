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
    Alert
} from 'react-native'
import { Picker } from "@react-native-community/picker"
import BaseRequest from "../../api/BaseRequest"
import DeviceStorage from "../../api/DeviceStorage"
import { PinchGestureHandler } from 'react-native-gesture-handler'

var { width } = Dimensions.get("window")
var { height } = Dimensions.get("window")



export default class vote extends Component {
    state = {
        refreshing: false,
        products: [],
        index: 0,
        feedbacks: []
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
        const { products } = this.state
        for (let i = 0; i < products.length; i++) {
            var name = products[i].name
            Pickers.push(
                <Picker.Item label={name} value={i} key={i} />
                // <Text>{name}</Text>
            )
            // Views.push(
            //     <Picker.Item name={name} />
            // )
        }

        return (
            <Picker
                mode="dropdown"
                selectedValue={this.state.index}
                onValueChange={(index) => {
                    this.setState({
                        index: index
                    })
                }}
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
        const {navigation} =this.props
        for (let i = 0; i < feedbacks.length; i++) {
            var title = feedbacks[i].title
            Views.push(
                // <View key={i} style={{ width: width, height: 60, flexDirection: "row", backgroundColor: "res", }}>
                <TouchableOpacity
                key={i}
                onPress={()=>{
                    navigation.navigate("反馈详情")
                }}
                >
                <View  style={styles.feedbackstyle}>
                    <Image source={require("../../resource/head.png")} style={{ width: 60, height: 60,marginLeft:15 }} />
                    <View style={styles.right}>
                        <Text >{title}</Text>
                        <Text>123</Text>
                    </View>
                    <View>

                    </View>
                </View >
                </TouchableOpacity>

            )
        }


        // console.log(Views.length)
        return (
            <ScrollView style={{ height: height - 100}}>
                {Views}
            </ScrollView>


        )


    }

    componentDidMount() {
        this.getProduct()
        // this._getfeedback()
    }
    componentDidUpdate() {
        this._getfeedback()
    }
    render() {
        const { navigation } = this.props
        return (
            <View>
                <Image
                    source={require("../../resource/feedback.jpg")}
                    style={{ width: width, height: 100 }}
                />
                {this._PickerList()}
                {this._ScreenView()}
                <TouchableOpacity
                    style={styles.addfeedback}
                    onPress={() => {
                        // navigation.navigate("反馈")
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
            </View>
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
    right:{
        marginLeft:10,
        marginTop:10
    }
})

