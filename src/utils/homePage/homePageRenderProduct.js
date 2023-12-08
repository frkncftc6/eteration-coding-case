import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Colors,
  Radius,
  Size,
  Space,
  ZIndex,
  FontSize,
  FontWeight,
} from '@styles';
import {AImage, AText, AButton} from '@components/molecules';
import OutlineLike from '@assets/icons/like_outline.svg';
import FilledLike from '@assets/icons/like_filled.svg';
import {productStore} from '@stores';
import {inject, observer} from 'mobx-react';

const RenderProductComponent = ({item, navigateProductDetailScreen}) => {
  const {image, price, name, id} = item;

  const {productsInCart, toggleInCart, likedProducts, toggleLikedProducts} =
    productStore;

  let isAddedProductsExists = productsInCart.some(
    addedProduct => addedProduct.id == id,
  );

  let isLikedProductExists = likedProducts.some(
    likedProduct => likedProduct.id == id,
  );

  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: Colors.gray,
      borderRadius: Radius.m,
      width: Size['4xl'],
      height: Size.m6xl,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: Space.s,
      paddingVertical: Space.xs,
    },
    imageBox: {
      width: Size.full,
      borderRadius: Radius.m,
    },
    image: {
      borderRadius: Radius.m,
    },
    favoriteIcon: {
      zIndex: ZIndex.max,
      position: 'absolute',
      top: Space.xxs,
      right: Space.xxs,
    },
    priceAndNameBox: {
      width: Size.full,
      minHeight: Size.xl,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    buttonStyle: {
      borderWidth: isAddedProductsExists ? 1 : 0,
      borderColor: isAddedProductsExists ? Colors.blue : null,
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigateProductDetailScreen(item)}>
      <View style={styles.imageBox}>
        <AImage uri={image} height={Size['3xl']} style={styles.image} />
        {isLikedProductExists ? (
          <TouchableOpacity
            style={styles.favoriteIcon}
            onPress={() => toggleLikedProducts(item, isLikedProductExists)}>
            <FilledLike width={Size.l} height={Size.l} color={Colors.yellow} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.favoriteIcon}
            onPress={() => toggleLikedProducts(item, isLikedProductExists)}>
            <OutlineLike width={Size.l} height={Size.l} color={Colors.yellow} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.priceAndNameBox}>
        <AText fontSize={FontSize.m} color={Colors.blue}>{`${price} ₺`}</AText>
        <AText
          fontSize={FontSize.m}
          color={Colors.textBlack}
          fontWeight={FontWeight.bold}>
          {name}
        </AText>
      </View>
      <AButton
        height={Size.mxl}
        backgroundColor={isAddedProductsExists ? Colors.white : Colors.blue}
        borderRadius={Radius.m}
        onPress={() => toggleInCart(item, isAddedProductsExists)}
        style={styles.buttonStyle}>
        <AText
          fontSize={FontSize.l}
          color={isAddedProductsExists ? Colors.blue : Colors.white}>
          {isAddedProductsExists ? 'Added to Cart' : 'Add to Cart'}
        </AText>
      </AButton>
    </TouchableOpacity>
  );
};

export const RenderProduct = inject('productStore')(
  observer(RenderProductComponent),
);
