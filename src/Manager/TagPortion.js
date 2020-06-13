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


var { width } = Dimensions.get("window")
var { height } = Dimensions.get("window")

export default class TagPortion extends Component {
    state = {
        feedbacks: [],
        Color: [
            "#db505e",
            "#278ad2",
            "#cfd3d7",
            "#a7eff0",
            "#8671ff",
            "#008672",
            "#e5e76f",
            "#d876e3",
            // "#d93f0b",
            // "#74b0c9",
            // "#ca87e5",
            // "#749b11",
            // "#7740e5",
            // "#50d870",
            // "#efab58",
            // "#7fef88",
            // "#7b4eb2",
            // "#7185dd",
            // "#22e27c",
            // "#b3e281",
        ]
    }
    //获取反馈
    _getfeedback = async () => {
        const product_id = await DeviceStorage.get("product_id")
        // console.log(product_id)
        // console.log(index)
        const url = "/service/v1/issue/product/" + product_id + "?status=opening"
        const res = await BaseRequest(url, "GET")
        // console.log(res)
        // console.log(res.result.issues[0])
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
        // console.log(feedbacks.tags)
        console.log(feedbacks.length)
        for (let i = 0; i < feedbacks.length; i++) {
            var title = feedbacks[i].title
            var description = feedbacks[i].description

            //    var tags= feedbacks[i].tags

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
                                onpress={() => {

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

    TagView = (i) => {
        const { feedbacks } = this.state
        // console.log(feedbacks[0].tags.length)
        const TagView = []
            for (let j = 0; j < feedbacks[i].tags.length; j++) {
                if (feedbacks[i].tags[j].checked) {
                    TagView.push(
                        <View key={i + j} style={{backgroundColor:feedbacks[i].tags[j].color,  alignSelf:"flex-start",marginLeft:5}}>
                            <Text >{feedbacks[i].tags[j].name}</Text>
                            {/*  */}
                        </View>
                    )
                }
            }


        return (
            <View style={{flexDirection:"row"}}>
                {TagView}
            </View>

        )
    }
    TagList = () => {
        return (
            <View>
                <Text>123</Text>
            </View>
        )
    }
    componentDidMount() {
        this._getfeedback()
    }
    componentDidUpdate(){

    }

    render() {
        return (
            <View style={{flexDirection:"row"}}>
                {this._feedback()}
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

