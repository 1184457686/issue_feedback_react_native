import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native'

import DeviceStorage from "../../api/DeviceStorage"
import BaseRequest from "../../api/BaseRequest"
import Request from "../../api/Request"
import { CheckBox, Button, ListItem } from "native-base"
import AsyncStorage from '@react-native-community/async-storage'

var { width } = Dimensions.get("window")
var { height } = Dimensions.get("window")

export default class TagPortion extends Component {
    state = {
        feedbacks: [],
        hidden: true,
        index: 0,
        selete: [],
        seleted: false
    }
    //获取反馈
    _getfeedback = async () => {
        const product_id = await DeviceStorage.get("product_id")
        const url = "/service/v1/issue/product/" + product_id + "?status=opening"
        const res = await BaseRequest(url, "GET")
        res.ok ?
            this.setState({
                feedbacks: res.result.issues,
            }) :
            console.log(res)
    }
    //返回反馈
    _feedback = () => {
        const Myfeedback = []
        const { feedbacks } = this.state
        for (let i = 0; i < feedbacks.length; i++) {
            var title = feedbacks[i].title
            var description = feedbacks[i].description

            Myfeedback.push(
                <View style={styles.feedbackstyle} key={i}>
                    <Image source={require("../../resource/head.png")} style={{ width: 60, height: 60, marginLeft: 15 }} />
                    <View style={styles.right}>
                        <Text >{title}</Text>
                        <Text>{description}</Text>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                            <Text>Lable:</Text>
                            {this.TagView(i)}
                            <TouchableOpacity
                                onPress={() => {
                                    AsyncStorage.setItem("issue_id", feedbacks[i].issue_id)
                                        this.setState({
                                            hidden: false,
                                            index: i
                                        })
                                }}
                            >
                                <Image source={require("../../resource/AddTag.png")} style={{ width: 13, height: 13, margin: 5 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View >

            )
        }
        return (
            <ScrollView style={{ height: height - 100 }} >
                {Myfeedback}
            </ScrollView>


        )

    }
    //显示标签
    TagView = (i) => {
        const { feedbacks } = this.state
        const TagView = []
        for (let j = 0; j < feedbacks[i].tags.length; j++) {
            if (feedbacks[i].tags[j].checked) {
                TagView.push(
                    <View key={i + j} style={{ backgroundColor: feedbacks[i].tags[j].color, alignSelf: "flex-start", marginLeft: 5 }}>
                        <Text >{feedbacks[i].tags[j].name}</Text>
                    </View>
                )
            }
        }


        return (
            <View style={{ flexDirection: "row"}}>
                {TagView}
            </View>

        )
    }
    //所有标签列表
    TagList = () => {
        const TagList = []
        const { feedbacks, index, hidden, seleted } = this.state
        if (hidden) {
            return;
        } else {
            for (let i = 0; i < feedbacks[index].tags.length; i++) {
                TagList.push(
                    <TouchableOpacity 
                    key={i} style={{ flexDirection: "row", backgroundColor: feedbacks[index].tags[i].color, width: 70, height: 50,zIndex:1 }}
                    onPress={()=>
                        this.UpadataTag(feedbacks[index].tags[i].name)
                    }
                    >
                        <Text style={{ alignSelf: "flex-start" }}>{feedbacks[index].tags[i].name}</Text>
                    </TouchableOpacity>
                )
            }
            return (
                <View >
                    {TagList}
                    <Button
                    onPress={()=>{
                        this.setState({
                            hidden:true
                        })
                    }}
                    >
                        <Text>关闭</Text>
                    </Button>
                </View>
            )
        }
    }
    //更新标签
    UpadataTag = async (name) => {
        const issue_id = await DeviceStorage.get("issue_id")
        const url = "/service/v1/issue/" + issue_id + "/tag"
        const arr =[name]
        const data = {
            "tags_name": arr
        }
        const res = await Request(url, data, "PUT")
        if (res.ok) {
        } else {
            console.log(res.message)
        }


    }
    componentDidMount() {
        this._getfeedback()
    }
    componentDidUpdate() {
        if (!this.state.hidden) {
            this._getfeedback()
        }

    }
    render() {
        return (
            <View style={{ flexDirection: "row", float: "left" }}>
                {this._feedback()}
                {this.TagList()}
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
        height: 80,
        flexDirection: "row",
        // backgroundColor: "red",
        marginTop: 3
    },
    right: {
        marginLeft: 10,
        marginTop: 10
    },
    Tagstyle: {

        height: 20,
        // backgroundColor:this.color
    }
})

