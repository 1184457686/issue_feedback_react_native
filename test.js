import React, { Component } from 'react'
import { Text, View, Alert, TouchableOpacity } from 'react-native'
import { } from 'react-native-gesture-handler'

export default class test extends Component {
  state = {
    a: []
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.state.a.push("123")
          }}
        >
          <Text>123</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log(this.state.a.length)
          }}
        >
          <Text>456</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
