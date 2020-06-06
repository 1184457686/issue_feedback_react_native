import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    Settings
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

var widths = Dimensions.get("window").width
var heights = Dimensions.get("window").hight
export default class mine extends Component {
    state = {
        default: "User"
    }
    ChangeImage = (res) => {

    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#CCC", height: heights }}>
                <View style={styles.top}>
                    <Image source={require("../../resource/head.png")} style={{ width: 80, height: 80, }} />
                    <Text style={{ marginLeft: 50, fontSize: 30 }}>{this.state.default}</Text>
                </View>
                <TouchableOpacity
                 style={styles.Setting}
                // onPress={
                    
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
    Setting: {
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        height:30
    }
})