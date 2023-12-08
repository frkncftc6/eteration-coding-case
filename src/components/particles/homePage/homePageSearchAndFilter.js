import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SearchBox} from '@components/particles/searchBox';
import {Colors, FontSize, Radius, Size, Space} from '@styles';
import {AText, AButton} from '@components/molecules';

export const SearchAndFilter = props => {
  const {searchProduct, setSearchProduct, handleModal} = props;
  return (
    <View style={styles.container}>
      <SearchBox searchText={searchProduct} setSearchText={setSearchProduct} />
      <View style={styles.filterBox}>
        <AText fontSize={FontSize.xxl}>Filters:</AText>
        <AButton
          width={Size['4xl']}
          height={Size.xl}
          borderRadius={Radius.l}
          backgroundColor={Colors.gray}
          onPress={handleModal}>
          <AText fontSize={FontSize.l}>Select Filter</AText>
        </AButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Space.m,
  },
  filterBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Size.full,
    marginTop: Space.s,
  },
});
