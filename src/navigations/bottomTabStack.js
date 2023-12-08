import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {options} from '@navigations/options';
import HomePageStack from '@navigations/homePageStack';
import ShoppingCartScreen from '@screens/ShoppingCartScreen';
import FavoriteProductsScreen from '@screens/FavoriteProductsScreen';
import UserDetailScreen from '@screens/UserDetailScreen';
import Home from '@assets/icons/home.svg';
import ShoppingCart from '@assets/icons/shopping_cart.svg';
import LikeOutline from '@assets/icons/like_outline.svg';
import UserCircle from '@assets/icons/user_circle.svg';
import {Colors, FontSize, FontWeight, Size, ZIndex} from '@styles';
import {inject, observer} from 'mobx-react';
import {productStore} from '@stores';
import {AText} from '@components/molecules';

const BottomTabStack = createBottomTabNavigator();

const BottomtabStackNavigator = () => {
  const {productsInCart} = productStore;
  let cartLength = productsInCart.length;
  return (
    <BottomTabStack.Navigator screenOptions={options}>
      <BottomTabStack.Screen
        name="HomePageStack"
        component={HomePageStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Home width={Size.mxl} height={Size.mxl} color={color} />
          ),
        }}
      />
      <BottomTabStack.Screen
        name="ShoppingCartScreen"
        component={ShoppingCartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({color}) => (
            <View style={styles.iconBox}>
              <ShoppingCart width={Size.mxl} height={Size.mxl} color={color} />
              {cartLength > 0 && (
                <View style={styles.badgeBox}>
                  <AText
                    fontSize={FontSize.s}
                    color={Colors.white}
                    fontWeight={FontWeight.bold}>
                    {productsInCart.length}
                  </AText>
                </View>
              )}
            </View>
          ),
        }}
      />
      <BottomTabStack.Screen
        name="FavoriteProductsScreen"
        component={FavoriteProductsScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({color}) => (
            <LikeOutline width={Size.mxl} height={Size.mxl} color={color} />
          ),
        }}
      />
      <BottomTabStack.Screen
        name="UserDetailScreen"
        component={UserDetailScreen}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: ({color}) => (
            <UserCircle width={Size.mxl} height={Size.mxl} color={color} />
          ),
        }}
      />
    </BottomTabStack.Navigator>
  );
};

export default inject('productStore')(observer(BottomtabStackNavigator));

const styles = StyleSheet.create({
  iconBox: {
    width: Size.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeBox: {
    width: Size.l - Size.s,
    height: Size.l - Size.s,
    borderRadius: (Size.l - Size.s) / 2,
    backgroundColor: Colors.red,
    position: 'absolute',
    zIndex: ZIndex.max,
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
