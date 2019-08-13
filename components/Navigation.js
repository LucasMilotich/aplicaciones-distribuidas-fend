import React, { Component } from 'react'
import { View } from 'react-native'
import { Header } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation'
import { createStackNavigator, createAppContainer } from 'react-navigation';

class Navigation extends Component {
  render () {

    // const {navigate} = this.props.navigation;

    return (
      <View >
        <Header
          leftComponent={{ icon: 'tv', color: '#fff' }}
          centerComponent={{ text: 'App Movies', style: { color: '#fff' } }}
          rightComponent={{ 
              icon: 'home', 
              color: '#fff',
              // onPress: () => alert("aa"),
            }}
        />
      </View>

    )
  }
}

export default Navigation
