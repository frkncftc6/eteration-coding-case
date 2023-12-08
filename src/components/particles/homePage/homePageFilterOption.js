import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {AText, ACheckbox} from '@components/molecules';
import {SearchBox} from '@components/particles/searchBox';
import {Size, Space, FontSize, Colors, FontWeight} from '@styles';

export const FilterOption = props => {
  const {
    sort,
    title,
    array,
    checkboxState,
    checkboxOnPress,
    searchText,
    setSearchText,
    selectedItem,
  } = props;

  return (
    <View style={styles.container}>
      <AText
        fontSize={FontSize.xl}
        color={Colors.gray}
        fontWeight={FontWeight[6]}
        style={styles.containerText}>
        {title}
      </AText>
      {sort ? (
        <>
          {array.map(item => {
            return (
              <View key={item.id} style={styles.containerCheckbox}>
                <ACheckbox
                  radio
                  id={item.id}
                  title={item.title}
                  state={checkboxState}
                  textStyle={styles.containerCheckboxText}
                  onPress={() => checkboxOnPress(item.id)}
                />
              </View>
            );
          })}
        </>
      ) : (
        <>
          <SearchBox searchText={searchText} setSearchText={setSearchText} />
          <ScrollView style={styles.containerScrollView} nestedScrollEnabled>
            {array.map((item, index) => {
              return (
                <View key={index} style={styles.containerCheckbox}>
                  <ACheckbox
                    title={`${item}`}
                    state={selectedItem.includes(item)}
                    onPress={() => checkboxOnPress(item)}
                    textStyle={styles.containerCheckboxText}
                  />
                </View>
              );
            })}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Size.full,
    marginTop: Space.s,
    borderBottomWidth: 1,
    paddingBottom: Space.s,
  },
  containerText: {
    marginBottom: Space.s,
  },
  containerCheckbox: {
    marginVertical: Space.xs,
    paddingHorizontal: Space.s,
  },
  containerCheckboxText: {
    fontSize: FontSize.l,
    color: Colors.textBlack,
    fontWeight: FontWeight.normal,
  },
  containerScrollView: {
    height: Size['4xl'],
  },
});
