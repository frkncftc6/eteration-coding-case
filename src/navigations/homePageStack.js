import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePageScreen from '@screens/HomePageScreen';
import ProductDetailScreen from '@screens/ProductDetailScreen';
import {options} from '@navigations/options';

const HomePage = createNativeStackNavigator();

const HomePageStack = () => {
  return (
    <HomePage.Navigator screenOptions={options}>
      <HomePage.Screen name="HomePageScreen" component={HomePageScreen} />
      <HomePage.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
    </HomePage.Navigator>
  );
};

export default HomePageStack;
