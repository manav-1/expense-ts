import React from 'react';
import HomeScreen from '../screens/Home';
import Profile from '../screens/Profile';
import Expenses from '../screens/Expenses';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import Notes from '../screens/Notes';
import Analytics from '../screens/Analytics';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const HomeTabNavigation = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#0008',
        tabBarLabelStyle: {fontFamily: 'Karla-Medium', fontSize: 9.5},
        tabBarStyle: {
          borderRadius: 50,
          position: 'absolute',
          overflow: 'hidden',
          left: 15,
          bottom: 10,
          right: 15,
          // padding: 5,
          height: 60,
        },
      }}>
      <Tab.Screen
        component={HomeScreen}
        name="Home"
        options={{
          tabBarIcon: ({focused, color}) =>
            !focused ? (
              <Ionicons size={20} color={color} name="home-outline" />
            ) : (
              <Ionicons size={20} color={color} name="home" />
            ),
          tabBarIndicatorStyle: {backgroundColor: '#25253d'},
        }}
      />
      <Tab.Screen
        name="Expenses"
        component={Expenses}
        options={{
          tabBarIcon: ({focused, color}) =>
            !focused ? (
              <Ionicons size={20} color={color} name="card-outline" />
            ) : (
              <Ionicons size={20} color={color} name="card" />
            ),
          tabBarIndicatorStyle: {backgroundColor: '#25253d'},
        }}
      />

      <Tab.Screen
        name="Notes"
        component={Notes}
        options={{
          tabBarIcon: ({focused, color}) =>
            !focused ? (
              <Ionicons size={20} color={color} name="attach-outline" />
            ) : (
              <Ionicons size={20} color={color} name="attach" />
            ),
          tabBarIndicatorStyle: {backgroundColor: '#25253d'},
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={Analytics}
        options={{
          tabBarIcon: ({focused, color}) =>
            !focused ? (
              <Ionicons size={20} color={color} name="analytics-outline" />
            ) : (
              <Ionicons size={20} color={color} name="analytics" />
            ),
          tabBarIndicatorStyle: {backgroundColor: '#25253d'},
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused, color}) =>
            !focused ? (
              <Ionicons size={20} color={color} name="person-outline" />
            ) : (
              <Ionicons size={20} color={color} name="person" />
            ),
          tabBarIndicatorStyle: {backgroundColor: '#25253d'},
        }}
      />
    </Tab.Navigator>
  );
};

HomeTabNavigation.propTypes = {
  navigation: PropTypes.object,
};
export default HomeTabNavigation;
