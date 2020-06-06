import React, { Component } from 'react'
import { Text, View,TouchableOpacity } from 'react-native'


class Demand extends Component {
    test = async () => {
        const data={

        }
        const res = await Request("/v1/products", data,"GET")
       console.log(res)
    }
    render() {
        return (
            <View>
                <TouchableOpacity
                onPress={()=>
                    this.test()
                    }>
                <Text > textInComponent </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default Demand;