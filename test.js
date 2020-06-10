import React, { Component } from 'react'
import { Text, View } from 'react-native'
import VisibleView from "rn-visible-view"

export default class test extends Component {
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
  
          <VisibleView visible={true}>
            <Text style={styles.instructions}>
              To get started, edit index.ios.js
            </Text>
            <Text style={styles.instructions}>
              Press Cmd+R to reload,{'\n'}
              Cmd+D or shake for dev menu
            </Text>
          </VisibleView>
        </View>
      );
    }
  }
