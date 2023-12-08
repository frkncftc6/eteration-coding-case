import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Size} from '@styles';

export const AImage = props => {
  const {style, uri, width, height} = props;

  const styles = StyleSheet.create({
    imageStyle: {
      width: width || Size.full,
      height: height || Size.full,
    },
  });

  return (
    <Image
      resizeMethod="resize"
      source={{uri: `${uri}`}}
      style={[style, styles.imageStyle]}
    />
  );
};
