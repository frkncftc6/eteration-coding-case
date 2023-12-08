import React, {useEffect, useState, useMemo} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {productStore} from '@stores';
import {inject, observer} from 'mobx-react';
import {Header} from '@components/particles/header';
import {
  SearchAndFilter,
  FilterModal,
  ProductList,
} from '@components/particles/homePage';
import {Colors} from '@styles';

const window = Dimensions.get('window');

const HomePageScreen = ({navigation}) => {
  const {products, getProducts, productsInCart, likedProducts} = productStore;

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchProduct, setSearchProduct] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState('oldToNew');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);

  const itemsPerPage = 12;

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    async function getData() {
      setLoading(true);
      await getProducts(currentPage, itemsPerPage);
      setLoading(false);
    }
    getData();
  }, [currentPage]);

  const uniqueBrands = useMemo(
    () => [...new Set(products.map(product => product.brand))],
    [products],
  );

  const brandModels = useMemo(() => {
    if (selectedBrands.length > 0) {
      const selectedBrandModels = selectedBrands.flatMap(brand =>
        products
          .filter(product => product.brand === brand)
          .flatMap(product => product.model),
      );
      return [...new Set(selectedBrandModels)];
    } else {
      return [...new Set(products.map(product => product.model))];
    }
  }, [selectedBrands, products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filteredByBrand;
    let filteredByModel;

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchProduct.toLowerCase()),
    );

    if (selectedBrands.length === 0) {
      filteredByBrand = filtered;
    } else {
      filteredByBrand = filtered.filter(item =>
        selectedBrands.includes(item.brand),
      );
    }

    if (selectedModels.length === 0) {
      filteredByModel = filteredByBrand;
    } else {
      filteredByModel = filteredByBrand.filter(item =>
        selectedModels.includes(item.model),
      );
    }

    if (sortOrder == 'oldToNew') {
      const sortByCreatedAt = (a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateA - dateB;
      };
      return filteredByModel.slice().sort(sortByCreatedAt);
    } else if (sortOrder == 'newToOld') {
      const sortByCreatedAt = (a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateB - dateA;
      };
      return filteredByModel.slice().sort(sortByCreatedAt);
    } else if (sortOrder == 'highToLow') {
      return filteredByModel.sort((a, b) => b.price - a.price);
    } else if (sortOrder == 'lowToHigh') {
      return filteredByModel.sort((a, b) => a.price - b.price);
    } else {
      return filteredByModel;
    }
  }, [
    products,
    productsInCart,
    searchProduct,
    sortOrder,
    selectedBrands,
    selectedModels,
    likedProducts,
  ]);

  const handleEndReached = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  const handleClose = () => {
    setSortOrder('oldToNew');
    setSelectedBrands([]);
    setSelectedModels([]);
    setModalVisible(!modalVisible);
  };

  const handleSort = sortType => {
    setSortOrder(sortType);
  };

  const handleBrandsCheckbox = brand => {
    setSelectedBrands(prevSelectedBrands => {
      if (prevSelectedBrands.includes(brand)) {
        return prevSelectedBrands.filter(item => item !== brand);
      } else {
        return [...prevSelectedBrands, brand];
      }
    });
    setSelectedModels([]);
  };

  const handleModelsCheckbox = model => {
    setSelectedModels(prevSelectedModels => {
      if (prevSelectedModels.includes(model)) {
        return prevSelectedModels.filter(item => item !== model);
      } else {
        return [...prevSelectedModels, model];
      }
    });
  };

  const navigateProductDetailScreen = product => {
    navigation.navigate('ProductDetailScreen', {product: product});
  };

  return (
    <>
      <View style={styles.scrollView}>
        <Header text={'E-Market'} />
        <SearchAndFilter
          searchProduct={searchProduct}
          setSearchProduct={setSearchProduct}
          modalVisible={modalVisible}
          window={window}
          handleModal={handleModal}
          sortOrder={sortOrder}
          selectedBrands={selectedBrands}
          selectedModels={selectedModels}
          uniqueBrands={uniqueBrands}
          brandModels={brandModels}
          handleBrandsCheckbox={handleBrandsCheckbox}
          handleModelsCheckbox={handleModelsCheckbox}
        />
        <ProductList
          products={filteredAndSortedProducts}
          loading={loading}
          handleEndReached={handleEndReached}
          navigateProductDetailScreen={navigateProductDetailScreen}
        />
      </View>
      <FilterModal
        modalVisible={modalVisible}
        window={window}
        closeModal={handleClose}
        handleModal={handleModal}
        sortOrder={sortOrder}
        handleSort={handleSort}
        selectedBrands={selectedBrands}
        selectedModels={selectedModels}
        uniqueBrands={uniqueBrands}
        brandModels={brandModels}
        handleBrandsCheckbox={handleBrandsCheckbox}
        handleModelsCheckbox={handleModelsCheckbox}
      />
    </>
  );
};

export default inject('productStore')(observer(HomePageScreen));

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});
