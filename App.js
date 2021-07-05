/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Home from './screens/Home';
import Search from './screens/Search';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#00aaff' />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = 'city';
              } else if (route.name === 'Search') {
                iconName = 'search';
              }
              return <FontAwesome5
                name={iconName}
                size={25}
                color={color}
              />
            }
          })}
          tabBarOptions={{
            activeTintColor: 'white',
            inactiveTintColor: 'grey',
            activeBackgroundColor: '#00aaff',
            inactiveBackgroundColor: '#00aaff'
          }}
        >
          <Tab.Screen
            name='Home'
            component={Home}
            initialParams={{ city: 'london' }} />
          <Tab.Screen
            name='Search'
            component={Search}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
