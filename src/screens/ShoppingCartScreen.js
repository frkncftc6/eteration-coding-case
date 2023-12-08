import React from 'react';
import {Header} from '@components/particles/header';
import {Colors, FontSize, Size, Space, Radius, FontWeight} from '@styles';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {inject, observer} from 'mobx-react';
import {productStore} from '@stores';
import {AText, AButton} from '@components/molecules';
import Add from '@assets/icons/add.svg';
import Minus from '@assets/icons/minus.svg';

const ShoppingCartScreen = ({navigation}) => {
  const {
    productsInCart,
    toggleInCart,
    changeCountOfProduct,
    calculatedTotalPrice,
  } = productStore;
  return (
    <View style={styles.container}>
      <Header text={'E-Market'} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainerStyle}>
        {productsInCart.map(item => {
          let isAddedProductsExists = productsInCart.some(
            addedProduct => addedProduct.id == item.id,
          );
          return (
            <View key={item.id} style={styles.itemBox}>
              <View style={styles.itemBoxNameAndPriceBox}>
                <AText fontSize={FontSize.l}>{item.name}</AText>
                <AText
                  fontSize={FontSize.m}
                  color={Colors.blue}>{`${item.price} ₺`}</AText>
              </View>
              <View style={styles.itemBoxRightBox}>
                <TouchableOpacity
                  style={styles.itemBoxRightBoxButton}
                  onPress={() =>
                    item.count > 1
                      ? changeCountOfProduct('decrease', item.id)
                      : toggleInCart(item, isAddedProductsExists)
                  }>
                  <Minus width={Size.m} height={Size.m} color={Colors.blue} />
                </TouchableOpacity>
                <View style={styles.itemBoxRightBoxText}>
                  <AText fontSize={FontSize.xl} color={Colors.white}>
                    {item.count}
                  </AText>
                </View>
                <TouchableOpacity
                  style={styles.itemBoxRightBoxButton}
                  onPress={() => changeCountOfProduct('increase', item.id)}>
                  <Add width={Size.m} height={Size.m} color={Colors.blue} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.footerBox}>
        <View style={styles.footerBoxTextBox}>
          <AText fontSize={FontSize.xl} color={Colors.blue}>
            Total:
          </AText>
          <AText fontSize={FontSize.xxl} fontWeight={FontWeight.bold}>
            {`${calculatedTotalPrice().toFixed(2)} ₺`}
          </AText>
        </View>
        <AButton
          width={Size['5xl']}
          height={Size.full}
          backgroundColor={Colors.blue}
          borderRadius={Radius.m}>
          <AText
            fontSize={FontSize.xxl}
            fontWeight={FontWeight.bold}
            color={Colors.white}>
            Complete
          </AText>
        </AButton>
      </View>
    </View>
  );
};

export default inject('productStore')(observer(ShoppingCartScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollView: {
    width: Size.full,
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: Space.l,
    paddingVertical: Space.s,
  },
  itemBox: {
    width: Size.full,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: Space.s,
  },
  itemBoxNameAndPriceBox: {
    width: Size.half,
    height: Size.full,
    alignItems: 'flex-start',
  },
  itemBoxRightBox: {
    width: Size.half,
    height: Size.full,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  itemBoxRightBoxButton: {
    backgroundColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    width: Size.xl,
    height: Size.xl,
  },
  itemBoxRightBoxText: {
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    width: Size.xxl,
    height: Size.xl,
  },
  footerBox: {
    width: Size.full,
    height: Size.m3xl,
    paddingHorizontal: Space.m,
    paddingVertical: Space.s,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerBoxTextBox: {
    height: Size.full,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});
