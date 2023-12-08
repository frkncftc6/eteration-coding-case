import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {options} from '@navigations/options';
import BottomtabStackNavigator from '@navigations/bottomTabStack';

const MainStack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={options}>
        <MainStack.Screen
          name="BottomTabStack"
          component={BottomtabStackNavigator}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
