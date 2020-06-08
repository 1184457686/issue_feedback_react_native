import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {Picker} from '@react-native-community/picker'
export default class FeedbackManage extends Component {
    state={
        language:"js"
    }
    render() {
        return (
            <View>
                <Picker
                    selectedValue={this.state.language}
                    onValueChange={(lang) => this.setState({ language: lang })}>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>
        )
    }
}
