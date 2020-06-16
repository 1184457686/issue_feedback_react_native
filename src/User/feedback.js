import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Alert,

} from 'react-native'

import Request from '../../api/Request';
import DeviceStorage from '../../api/DeviceStorage'
import {Picker} from "native-base"

var { width } = Dimensions.get('screen');
export default class feedback extends Component {
    state = {
        product_id: '',
        owner_id: '',
        title: '',
        description: '',
    }

    FeedbackContainer =async () => {
        const {navigation}=this.props
        const product_id=await DeviceStorage.get("product_id")
        const manager_id=await DeviceStorage.get("manager_id")
        const data = {
            "product_id": product_id,
            "owner_id": manager_id,
            "title": this.state.title,
            "description": this.state.description,

        }
        const token = await DeviceStorage.get('Token');
        // const res=await Requests('/issue', data, 'post', token)
        // console.log(res)
        Request('/service/v1/issue', data, 'post', token)
            .then(res => {
                if (res.ok) {
                    Alert.alert("反馈成功")
                    navigation.navigate("浏览")
                } else {
                    const error = res.message;
                    Alert.alert(error);
                }
            })
    }
    checkcontainer = () => {
        const {title } = this.state;
       if (title == '') {
            Alert.alert("主题为空")
        } else {
            this.FeedbackContainer()
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: "rgb(242,242,242)", alignItems: "center" }}>
                <View style={{ marginTop: 15 }}>
                    <TextInput
                        placeholder="请输入主题"
                        style={styles.textInput}
                        onChangeText={(value) => {
                            this.setState({
                                title: value
                            })
                        }}
                    />
                    <TextInput
                        placeholder="请输入描述"
                        style={styles.Description}
                        multiline={true}
                        onChangeText={(value) => {
                            this.setState({
                                description: value
                            })
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={styles.Touch}
                    onPress={() => this.checkcontainer()}
                    // onPress={()=> {this.props.navigation.navigate("浏览")}}
                >
                    <Text style={styles.text}>提交反馈</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    Touch: {
        height: 35,
        width: 300,
        backgroundColor: "blue",
        marginTop: 30,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        opacity: 0.5,

    },
    textInput: {
        marginBottom: 5,
        backgroundColor: "white",
        width: width,
    },
    Description: {
        height: 200,
        backgroundColor: "white",
        width: width,
        textAlignVertical: 'top',
        borderLeftColor: "red"

    },
    text: {

    }
})