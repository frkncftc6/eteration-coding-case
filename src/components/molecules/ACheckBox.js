import React from 'react';
import {StyleSheet} from 'react-native';
import {CheckBox, Icon} from '@rneui/themed';
import {Colors, Size} from '@styles';

export const ACheckbox = props => {
  const {id, radio, title, state, setState, style, textStyle, onPress} = props;

  if (radio) {
    return (
      <CheckBox
        checkedIcon={
          <Icon
            name="radio-button-checked"
            type="material"
            color={Colors.blue}
            size={Size.l}
          />
        }
        uncheckedIcon={
          <Icon
            name="radio-button-unchecked"
            type="material"
            color={Colors.blue}
            size={Size.l}
          />
        }
        checked={state == id ? true : false}
        onPress={() => (onPress ? onPress() : setState(!state))}
        title={title}
        containerStyle={[style, styles.checkBoxContainer]}
        textStyle={textStyle}
      />
    );
  }

  return (
    <CheckBox
      title={title}
      checked={state}
      size={Size.l}
      onPress={() => (onPress ? onPress() : setState(!state))}
      checkedColor={Colors.blue}
      uncheckedColor={Colors.blue}
      wrapperStyle={style}
      textStyle={textStyle}
      containerStyle={styles.checkBoxContainer}
    />
  );
};

const styles = StyleSheet.create({
  checkBoxContainer: {
    width: Size.full,
    margin: 0,
    padding: 0,
    marginLeft: 0,
  },
});
