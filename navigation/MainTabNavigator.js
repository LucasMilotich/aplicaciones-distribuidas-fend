import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import LinksScreen from '../screens/LinksScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CommentsScreen from '../screens/CommentsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});





const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
    MovieDetailScreen: MovieDetailScreen,
    CommentsScreen: CommentsScreen
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Peliculas',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  LinksStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
