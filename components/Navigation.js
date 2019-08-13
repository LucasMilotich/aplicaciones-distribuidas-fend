import React, { Component } from 'react'
import { View } from 'react-native'
import { Header } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation'
import { createStackNavigator, createAppContainer } from 'react-navigation';

class Navigation extends Component {
  render () {
    return (
      <View >
        <Header
          centerComponent={{ text: 'Movies App', style: { color: '#fff' } }}
        />
      </View>
    )
  }
}

export default Navigation
