import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import LinksScreen from '../screens/LinksScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CommentsScreen from '../screens/CommentsScreen';
import NewCommentScreen from '../screens/NewCommentScreen';
import ChangePassword from '../screens/ChangePassword';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
    MovieDetailScreen: MovieDetailScreen,
    CommentsScreen: CommentsScreen,
    NewCommentScreen: NewCommentScreen
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Peliculas',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name= {Platform.OS === 'ios' ? 'ios-film' : 'md-film'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: ChangePassword,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Usuario',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  LinksStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
