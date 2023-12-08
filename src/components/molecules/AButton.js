import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Radius, Size} from '@styles';

export const AButton = props => {
  const {
    children,
    style,
    width,
    height,
    backgroundColor,
    borderRadius,
    onPress,
    disable,
  } = props;

  const styles = StyleSheet.create({
    buttonStyle: {
      width: width || Size.full,
      height: height || Size.m3xl,
      backgroundColor: backgroundColor,
      borderRadius: borderRadius || Radius['3xl'],
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <TouchableOpacity
      disabled={disable ? disable : false}
      onPress={onPress}
      style={[style, styles.buttonStyle]}>
      {children}
    </TouchableOpacity>
  );
};
