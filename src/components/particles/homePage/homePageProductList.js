import React from 'react';
import {FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import {Size, Space, Colors} from '@styles';
import {RenderProduct} from '@utils/homePage';

export const ProductList = props => {
  const {
    products,
    loading,
    handleEndReached,
    navigateProductDetailScreen,
  } = props;
  return (
    <FlatList
      nestedScrollEnabled
      data={products}
      renderItem={({item}) => (
        <RenderProduct
          item={item}
          navigateProductDetailScreen={navigateProductDetailScreen}
        />
      )}
      keyExtractor={item => item.id}
      style={styles.flatlist}
      contentContainerStyle={[styles.flexGrow]}
      columnWrapperStyle={styles.columnWrapperStyle}
      numColumns={2}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.2}
      ListFooterComponent={
        loading && <ActivityIndicator size="large" color={Colors.blue} />
      }
      ListFooterComponentStyle={styles.listFooterComponentStyle}
      getItemLayout={(_, index) => ({
        length: Size.m6xl,
        offset: Size.m6xl * index,
        index,
      })}
      initialNumToRender={12}
      removeClippedSubviews={false}
      disableIntervalMomentum
      scrollEventThrottle={200}
      windowSize={18}
      maxToRenderPerBatch={27}
      updateCellsBatchingPeriod={40}
    />
  );
};

const styles = StyleSheet.create({
  flatlist: {
    flex: 1,
    height: Size.full,
    marginTop: Space.m,
  },
  flexGrow: {
    flexGrow: 1,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Space.l,
    marginVertical: Space.xs,
  },
  listFooterComponentStyle: {
    marginTop: Space.xs,
  },
});
