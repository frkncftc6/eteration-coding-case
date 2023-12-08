import React from 'react';
import {Header} from '@components/particles/header';
import {Colors, Size, Space, FontSize, FontWeight, ZIndex} from '@styles';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {productStore} from '@stores';
import {inject, observer} from 'mobx-react';
import {AImage, AText} from '@components/molecules';
import OutlineLike from '@assets/icons/like_outline.svg';
import FilledLike from '@assets/icons/like_filled.svg';

const FavoriteProductsScreen = ({navigation}) => {
  const {likedProducts, toggleLikedProducts} = productStore;
  return (
    <View style={styles.container}>
      <Header text={'Favorites'} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.flexGrow]}>
        {likedProducts.map(product => {
          let isLikedProductExists = likedProducts.some(
            likedProduct => likedProduct.id == product.id,
          );
          return (
            <View key={product.id} style={styles.item}>
              <View style={styles.textBox}>
                <AText fontSize={FontSize.xxl} fontWeight={FontWeight.bold}>
                  {product.name}
                </AText>
                <AText
                  fontSize={FontSize.xl}
                  color={Colors.blue}>{`${product.price} ₺`}</AText>
                <AText
                  fontSize={
                    FontSize.l
                  }>{`${product.brand} - ${product.model}`}</AText>
              </View>
              <View style={styles.imageBox}>
                <AImage
                  width={Size.m4xl}
                  height={Size.m4xl}
                  uri={product.image}
                  style={styles.image}
                />
                {isLikedProductExists ? (
                  <TouchableOpacity
                    onPress={() =>
                      toggleLikedProducts(product, isLikedProductExists)
                    }>
                    <FilledLike
                      width={Size.mxl}
                      height={Size.mxl}
                      color={Colors.yellow}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      toggleLikedProducts(product, isLikedProductExists)
                    }>
                    <OutlineLike
                      width={Size.mxl}
                      height={Size.mxl}
                      color={Colors.yellow}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default inject('productStore')(observer(FavoriteProductsScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    width: Size.full,
    paddingHorizontal: Space.m,
    paddingVertical: Space.s,
  },
  flexGrow: {
    flexGrow: 1,
  },
  item: {
    width: Size.full,
    height: Size['4xl'],
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Space.s,
    borderBottomColor: Colors.gray,
  },
  textBox: {
    height: Size.full,
    justifyContent: 'space-between',
  },
  imageBox: {
    width: Size.m4xl,
    height: Size.full,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  image: {
    borderRadius: 5,
    resizeMode: 'contain',
  },
  icon: {
    zIndex: ZIndex.max,
    position: 'absolute',
    bottom: Space.s,
    right: Space.xxs,
  },
});
