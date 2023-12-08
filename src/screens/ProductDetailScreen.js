import React from 'react';
import {AButton, AImage, AText} from '@components/molecules';
import {Header} from '@components/particles/header';
import {inject, observer} from 'mobx-react';
import {productStore} from '@stores';
import {
  Colors,
  FontSize,
  FontWeight,
  Radius,
  Size,
  Space,
  ZIndex,
} from '@styles';
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';
import OutlineLike from '@assets/icons/like_outline.svg';
import FilledLike from '@assets/icons/like_filled.svg';

const ProductDetailScreen = ({navigation, route}) => {
  const {product} = route.params;
  const {productsInCart, toggleInCart, likedProducts, toggleLikedProducts} =
    productStore;

  let isAddedProductsExists = productsInCart.some(
    addedProduct => addedProduct.id == product.id,
  );

  let isLikedProductExists = likedProducts.some(
    likedProduct => likedProduct.id == product.id,
  );

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
      paddingHorizontal: Space.s,
      paddingVertical: Space.s,
    },
    imageBox: {
      width: Size.full,
      borderRadius: Radius.l,
    },
    image: {
      borderRadius: Radius.l,
    },
    favoriteIcon: {
      zIndex: ZIndex.max,
      position: 'absolute',
      top: Space.xs,
      right: Space.xs,
    },
    nameAndDescriptionBox: {
      width: Size.full,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    nameAndDescriptionBoxText: {
      width: Size.full,
      textAlign: 'justify',
      marginTop: Space.s,
    },
    footerBox: {
      width: Size.full,
      height: Size.m3xl,
      paddingHorizontal: Space.s,
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
    buttonStyle: {
      borderWidth: isAddedProductsExists ? 1 : 0,
      borderColor: isAddedProductsExists ? Colors.blue : null,
    },
  });

  return (
    <View style={styles.container}>
      <Header text={product.name} button={'back'} navigation={navigation} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.imageBox}>
          <AImage
            uri={product.image}
            height={Size['5xl']}
            style={styles.image}
          />
          {isLikedProductExists ? (
            <TouchableOpacity
              style={styles.favoriteIcon}
              onPress={() =>
                toggleLikedProducts(product, isLikedProductExists)
              }>
              <FilledLike
                width={Size.xl}
                height={Size.xl}
                color={Colors.yellow}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.favoriteIcon}
              onPress={() =>
                toggleLikedProducts(product, isLikedProductExists)
              }>
              <OutlineLike
                width={Size.xl}
                height={Size.xl}
                color={Colors.yellow}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.nameAndDescriptionBox}>
          <AText
            fontSize={FontSize['3xl']}
            fontWeight={FontWeight.bold}
            style={styles.nameAndDescriptionBoxText}>
            {product.name}
          </AText>
          <AText fontSize={FontSize.l} style={styles.nameAndDescriptionBoxText}>
            {product.description}
          </AText>
        </View>
      </ScrollView>
      <View style={styles.footerBox}>
        <View style={styles.footerBoxTextBox}>
          <AText fontSize={FontSize.xl} color={Colors.blue}>
            Price:
          </AText>
          <AText
            fontSize={FontSize.xxl}
            fontWeight={FontWeight.bold}>{`${product.price} ₺`}</AText>
        </View>
        <AButton
          width={Size['5xl']}
          height={Size.full}
          backgroundColor={isAddedProductsExists ? Colors.white : Colors.blue}
          borderRadius={Radius.m}
          onPress={() => toggleInCart(product, isAddedProductsExists)}
          style={styles.buttonStyle}>
          <AText
            fontSize={FontSize.xxl}
            fontWeight={FontWeight.bold}
            color={isAddedProductsExists ? Colors.blue : Colors.white}>
            {isAddedProductsExists ? 'Added to Cart' : 'Add to Cart'}
          </AText>
        </AButton>
      </View>
    </View>
  );
};

export default inject('productStore')(observer(ProductDetailScreen));
