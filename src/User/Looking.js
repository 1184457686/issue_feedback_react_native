import React, { Component } from 'react'
import { Text, View, RefreshControl, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { Picker } from "@react-native-community/picker"
import Request from "../../api/Request"
import DeviceStorage from "../../api/DeviceStorage"

var pages = []
var resource=[]
var keys=" "
var { width } = Dimensions.get("window")
var { height } = Dimensions.get("window")

async function GetProduct() {
    const res = await Request("/service/v1/products", "GET")
    if (res.ok) {
        for (let i = 0; i < res.result.products.length; i++){
            const name = res.result.products[i].name;
            pages.push(
                <Picker.Item label={name} value={name} key={i+1} />
            )
            resource.push(
                <Picker.Item label={name} value={name} key={i+1} />
            )
        }
    }
    JSON.stringify(resource);
    return pages
}
function GetProductList() {
    return (
        <View>
            <Picker
             style={{ width: 100, backgroundColor: "red", marginTop: 5 }}
             onValueChange={(Itemkey)=>[
                 keys=Itemkey
             ]}
             >
                {pages}
            </Picker>
        </View>
    );
}
getFeedback = () => {
    Request()

}



export default class vote extends Component {
        state = {
            refreshing: false,
            key:keys
        }
    
   
    getFeedback =async (key) => {
       const res=await Request()
    }
    getProduct = () => {
        Request()  
    }

    render() {
        const { navigation } = this.props
        return (
            <View>
                <Image
                    source={require("../../resource/feedback.jpg")}
                    style={{ width: width, height: 100 }}
                />
                <ScrollView style={{ backgroundColor: "red" }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.getFeedback(this.state.key)}
                        />
                    }

                />

                <GetProductList  />
                <TouchableOpacity
                    style={styles.addfeedback}
                    onPress={() => {
                        // navigation.navigate("反馈")
                        console.log(keys)
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



    }
})

