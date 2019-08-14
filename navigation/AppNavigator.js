import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginTabNavigator from './LoginTabNavigator'


export default createAppContainer(
  createSwitchNavigator({
    Login: LoginTabNavigator,
    Main: MainTabNavigator
  })
);
