import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, FontSize, FontWeight, Size, Space} from '@styles';
import {AText} from '@components/molecules';
import ArrowLeft from '@assets/icons/arrow_left.svg';
import Close from '@assets/icons/close.svg';

export const Header = props => {
  const {text, button, navigation, backgroundColor, buttonOnPress} = props;

  const handleButton = buttonOnPress
    ? buttonOnPress
    : () => navigation.goBack();

  const styles = StyleSheet.create({
    box: {
      width: Size.full,
      height: Size.xxl,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: Space.m,
      backgroundColor: backgroundColor ? backgroundColor : Colors.blue,
    },
    text: {
      marginLeft: button ? Space.m : 0,
    },
  });

  return (
    <View style={styles.box}>
      {button == 'back' ? (
        <TouchableOpacity onPress={handleButton}>
          <ArrowLeft
            width={Size.mxl}
            height={Size.mxl}
            color={backgroundColor ? Colors.black : Colors.white}
          />
        </TouchableOpacity>
      ) : button == 'close' ? (
        <TouchableOpacity onPress={handleButton}>
          <Close
            width={Size.mxl}
            height={Size.mxl}
            color={backgroundColor ? Colors.black : Colors.white}
          />
        </TouchableOpacity>
      ) : null}
      <AText
        fontSize={FontSize.xxl}
        fontWeight={FontWeight.bold}
        color={backgroundColor ? Colors.textBlack : Colors.white}
        style={styles.text}>
        {text}
      </AText>
    </View>
  );
};
