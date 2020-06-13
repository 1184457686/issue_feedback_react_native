import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    Settings,
    Alert
} from 'react-native'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import { Picker } from "@react-native-community/picker"
import DeviceStorage from "../../api/DeviceStorage"
import BaseRequest from "../../api/BaseRequest"
import Request from "../../api/Request"
import { navigation } from "@react-navigation/native"
var { width } = Dimensions.get("window")
var { height } = Dimensions.get("window")
export default class mine extends Component {
    state = {
        information: {},
        hidden: true,
        newgender: 0,
        newname: "",
    }
    //获取个人资料
    getinformation = async () => {
        const user_id = await DeviceStorage.get("id")
        const url = "/v1/profile/" + user_id
        const res = await BaseRequest(url, "GET")
        if (res.ok) {
            this.setState({
                information: res.result,
                newname: res.result.nickname
            })
        } else {
            console.log(res)
        }
    }
    //判断修改的信息是否正确
    judge = () => {
        const { newgender } = this.state
        if (newgender == 0 || newgender == 1) {
            this.addview()
        } else {
            Alert.alert("请正确填写性别")
        }
    }
    // 向后台传输数据
    addview = async () => {
        const issue_id = await DeviceStorage.get("issue_id")
        const user_id = await DeviceStorage.get("id")
        const { newgender, newname } = this.state
        // console.log(newname)
        // console.log(newgender)

        const url = "/service/v1/profile/" + user_id
        const data = {
            "nickname": newname,
            "gender": newgender
        }

        const res = await Request(url, data, "PUT")
        // // const res = await Request(url)

        if (res.ok) {
            this.setState({
                hidden: true
            })
        } else {
            const err = res.errors.message
            console.log(err)
        }
    }
    // 修改个人资料
    _changeView = () => {
        const { hidden, information } = this.state
        const view = []
        var gender
        switch (information.gender) {
            case 0:
                gender = "男";
                break;
            case 1:
                gender = "女";
                break;

        }
        if (hidden) {
            return;
        } else {
            view.push(
                <View key={0} >
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 30 }}>
                        <Text style={{ marginLeft: 13 }}>昵称：</Text>
                        <TextInput
                            style={{ position: "relative", left: 90, backgroundColor: "red", height: 40, width: 170, textAlign: "right" }}
                            defaultValue={information.nickname}
                            editable={true}
                            onChangeText={(value) => {
                                this.setState({
                                    newname: value
                                })
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 30 }}>
                        <Text style={{ marginLeft: 13 }}>性别：</Text>
                        <TextInput
                            style={{ position: "relative", left: 90, backgroundColor: "red", height: 40, width: 170, textAlign: "right" }}
                            defaultValue={gender}
                            editable={true}
                            onChangeText={(value) => {
                                switch (value) {
                                    case "男":
                                        this.setState({
                                            newgender: 0
                                        })
                                        break;
                                    case "女":
                                        this.setState({
                                            newgender: 1
                                        })
                                        break;
                                }
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
                        onPress={async () => {
                            this.judge()
                        }}
                    >
                        <Text>确定</Text>
                    </TouchableOpacity>
                </View>
            )
            return (
                // <View style={styles.addview}>
                <View style={styles.addview}>
                    {view}
                </View>
            )
        }
    }
    //显现个人信息
    Owninformation = () => {
        const mine = []
        const { information } = this.state
        var gender
        switch (information.gender) {
            case 0:
                gender = "男";
                break;
            case 1:
                gender = "女";
                break;

        }
        mine.push(
            <View style={styles.top} key={0}>
                <Image source={require("../../resource/head.png")} style={{ width: 80, height: 80, }} />
                <View style={styles.Top_Right}>
                    <Text style={{ fontSize: 20 }}>{information.nickname}</Text>
                    <Text style={{ marginTop: 5 }}>{gender}</Text>
                </View>
            </View>
        )
        return (
            <TouchableOpacity
                onPress={() => {
                    this.setState({
                        hidden: false
                    })
                }}>
                {mine}
            </TouchableOpacity>
        )
    }

    componentDidMount() {
        this.getinformation()
    }
    componentDidUpdate() {
        if (this.state.hidden == true) {
            this.getinformation()
        }

    }
    render() {
        return (
            <View style={{ width: width, height: height, backgroundColor: "#CCC" }}>
                {this.Owninformation()}
                {this._changeView()}

                <TouchableOpacity
                    style={styles.Setting}
                    onPress={() => [
                        this.getinformation()
                    ]}

                >
                    <Text>设置</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    top: {
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        height: 120,
        marginBottom: 10
    },
    Top_Right: {
        flexDirection: "column",
        marginLeft: 50,
    },
    Setting: {
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        height: 30
    },
    addview: {
        position: "absolute",
        // left: 30,
        // top: 50,
        left: width / 16,
        top: height / 3,
        width: width / 8 * 7,
        height: height / 3,
        backgroundColor: "gray",
        opacity: .7,
        zIndex: 1
    }
})