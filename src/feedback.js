import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableOpacity
} from 'react-native'

import Request from '../api/Request';

var { width } = Dimensions.get('screen');
export default class feedback extends Component {
    render() {
        return (
            <View style={{ backgroundColor: "rgb(242,242,242)", alignItems: "center" }}>
                <View style={{ marginTop: 15 }}>
                    <TextInput placeholder="请输入产品ID" style={styles.textInput} />
                    <TextInput placeholder="请输入主题" style={styles.textInput} />
                    <TextInput placeholder="请输入描述" style={styles.Description} multiline={true} />
                </View>
                <TouchableOpacity
                    style={styles.Touch}
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