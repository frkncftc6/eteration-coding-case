import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Colors, Size, Radius, Space, FontSize} from '@styles';

export const SearchBox = props => {
  const {searchText, setSearchText} = props;

  return (
    <View style={styles.textInputView}>
      <TextInput
        placeholder="Search"
        value={searchText}
        onChangeText={text => setSearchText(text)}
        style={styles.textInputStyle}
        underlineColor={Colors.transparent}
        activeUnderlineColor={Colors.transparent}
        selectionColor={Colors.black}
        placeholderTextColor={Colors.rgbBlack}
        allowFontScaling={false}
        left={
          <TextInput.Icon
            icon={'text-search'}
            size={Size.l}
            iconColor={Colors.rgbBlack}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputView: {
    width: Size.full,
    height: Size.xxl,
    borderRadius: Radius['5xl'],
    borderColor: Colors.transparent,
    backgroundColor: Colors.lightGray,
    marginVertical: Space.s,
  },
  textInputStyle: {
    backgroundColor: Colors.transparent,
    fontSize: FontSize.l,
    height: Size.xxl,
  },
});
