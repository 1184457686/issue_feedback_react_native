import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    Dimensions,
    StyleSheet
} from 'react-native'
import { TouchableOpacity, TextInput, ScrollView } from 'react-native-gesture-handler'

import DeviceStorage from "../../api/DeviceStorage"
import BaseRequest from "../../api/BaseRequest"

var { width, height } = Dimensions.get("window")

export default class feedbackdetail extends Component {
    state = {
        feedbacks: [],
        reviews: [],
        index: 0,
        time: "",
        like: "white",
        dislike: "white"
    }
    //获取反馈
    _getfeedback = async () => {
        const product_id = await DeviceStorage.get("product_id")
        const index = Number(await DeviceStorage.get("index"))
        this.setState({
            index: index
        })
        // console.log(product_id)
        // console.log(index)
        const url = "/service/v1/issue/product/" + product_id + "?status=opening"
        const res = await BaseRequest(url, "GET")
        // console.log(res)
        // console.log(res.result.issues[0])
        res.ok ?
            this.setState({
                feedbacks: res.result.issues[index],
                time: res.result.issues[index].updated_at
            }) :
            console.log(res)
    }
    // 计数
    Count = (a) => {
        const { feedbacks } = this.state
        if (a == "Yes" && this.state.like !== "red") {
            // console.log("123")
            feedbacks.likes++
            // feedbacks.dislikes--
        }
        if (a == "No" && this.state.dislike !== "red") {
            // console.log("456")
            feedbacks.dislikes++
            // feedbacks.likes--
        }

    }
    //返回反馈
    _feedbacke = () => {
        const Myfeedback = []
        const { index } = this.state
        // console.log(this.state.index)
        const { feedbacks, time } = this.state
        const updated_time = time.substring(0, 10)
        //   console.log(time.substring(0,10))
        Myfeedback.push(
            <View key={index} style={{ flexDirection: "row", backgroundColor: "gray", opacity: .6 }}>
                {/* 用户头像 */}
                <View>
                    <Text></Text>
                    <Image source={require("../../resource/head.png")} style={{ width: 80, height: 80 }} />
                </View>
                {/* 标题和描述 */}
                <View key={index} style={{ marginLeft: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 25, marginRight: 8 }}>{feedbacks.title}</Text>
                        <Text style={{ position: "absolute", right: 0, top: 10 }}>{updated_time}</Text>
                    </View>
                    <Text style={{ width: width - 100, height: 50, marginTop: 10 }}>{feedbacks.description}</Text>
                    {/* 点赞、踩 计数 */}
                    <View style={{ flexDirection: "row" }}>
                        {/* 点赞 */}
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (this.state.like == "white" && this.state.dislike == "white") {
                                        this.setState({
                                            like: "red",
                                            dislike: "white"
                                        })
                                        this.Count("Yes")
                                    }



                                }

                                }
                            >
                                <Image source={require("../../resource/yes.png")} style={{ width: 25, height: 25, tintColor: this.state.like }} />
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 10, marginTop: 5 }}>{feedbacks.likes}</Text>
                        </View>
                        {/* 踩 */}
                        <View style={{ marginLeft: 60, flexDirection: "row" }}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (this.state.like == "white" && this.state.dislike == "white") {

                                        this.setState({
                                            like: "white",
                                            dislike: "red"
                                        })
                                        this.Count("No")
                                    }


                                }}
                            >
                                <Image source={require("../../resource/No.png")} style={{ width: 25, height: 25, tintColor: this.state.dislike }} />
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 10, marginTop: 5 }}>{feedbacks.dislikes}</Text>
                        </View>
                        {/* 添加评论 */}
                        <View>
                            <TouchableOpacity
                                style={{ marginLeft: 80 }}
                                onPress={() => {
                                    this.
                                }}
                            >
                                <Image source={require("../../resource/review.png")} style={{ width: 25, height: 25, tintColor: "white" }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        )
        // console.log({Myfeedback})
        // console.log(feedbacks)

        return (
            <View >
                {Myfeedback}
            </View>
        )
    }
    // 获取评论
    _getreview = async () => {

        const issue_id = await DeviceStorage.get("issue_id")
        const url = "/service/v1/comments/" + issue_id

        // console.log(issue_id)
        const res = await BaseRequest(url, "GET")
        console.log(res)
        res.ok ?
            this.setState({
                reviews: res.result.comments
            }) :
            console.log(res)

    }
    _reviewView = () => {
        const reviewView = []
        const { reviews } = this.state
        for (let i = 0; i < reviews.length; i++) {
            reviewView.push(
                <View key={i} style={{ flexDirection: "row", marginTop: 20 }}>
                    <View style={{marginLeft:8}}>
                        <Image source={require("../../resource/head.png")} style={{ width: 50, height: 50 }} />
                        <Text style={{ marginTop: 10 }}>{reviews[i].owner.nickname}</Text>
                    </View>
                    <View style={{ flexDirection: "column" }}>
                        <Text style={{marginLeft:190,fontSize:10}}>{reviews[i].created_at.substring(0, 10)}</Text>
                        <Text>{reviews[i].content}</Text>

                    </View>
                </View>
            )
        }
        return (
            <ScrollView style={{height:height}}>
                {reviewView}
            </ScrollView>
        )

    }
    componentDidMount() {
        this._getfeedback()
        this._getreview()
    }
    componentDidUpdate() {
        if (this.state.feedbacks.length == 0) {
            this._feedbacke()
        }
        // if (this.state.reviews.length == 0) {
            this._getreview()
        // }

    }
    render() {
        return (
            // <View >
            //     <Text> textInComponent </Text>
            // </View>
            // <TouchableOpacity
            //     onPress={() =>
            //         this._feedbacke()
            //     }
            // >
            //     <Text>test</Text>
            // </TouchableOpacity>
            <View style={{ width: width, height: height }}>
                {this._feedbacke()}
                {this._reviewView()}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    addreview: {

    }


})
