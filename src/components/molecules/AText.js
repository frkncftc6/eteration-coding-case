import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Colors} from '@styles';

export const AText = props => {
  const {children, style, fontSize, fontWeight, color} = props;

  const styles = StyleSheet.create({
    textStyle: {
      fontSize: fontSize,
      fontWeight: fontWeight || 'normal',
      color: color || Colors.textBlack,
    },
  });
  return (
    <Text allowFontScaling={false} style={[style, styles.textStyle]}>
      {children}
    </Text>
  );
};
