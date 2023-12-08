import React, {useState, useMemo, memo} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import Modal from 'react-native-modal';
import {Header} from '@components/particles/header';
import {
  Colors,
  FontSize,
  FontWeight,
  Size,
  Space,
  Radius,
  ZIndex,
} from '@styles';
import {AText, AButton} from '@components/molecules';
import {sortArray} from '@utils/homePage';
import {FilterOption} from '@components/particles/homePage';

const FilterModalComponent = props => {
  const {
    modalVisible,
    window,
    closeModal,
    handleModal,
    sortOrder,
    handleSort,
    selectedBrands,
    selectedModels,
    uniqueBrands,
    brandModels,
    handleBrandsCheckbox,
    handleModelsCheckbox,
  } = props;

  const [searchBrand, setSearchBrand] = useState('');
  const [searchModel, setSearchModel] = useState('');

  const buttonWidth = window.width - Space.m;

  const filteredBrands = useMemo(() => {
    const filtered = uniqueBrands.filter(brand =>
      brand.toLowerCase().includes(searchBrand.toLowerCase()),
    );
    return filtered;
  }, [searchBrand, uniqueBrands]);

  const filteredModels = useMemo(() => {
    const filtered = brandModels.filter(model =>
      model.toLowerCase().includes(searchModel.toLowerCase()),
    );
    return filtered;
  }, [searchModel, brandModels]);

  return (
    <Modal
      isVisible={modalVisible}
      deviceHeight={window.height}
      deviceWidth={window.width}
      style={styles.modal}>
      <View style={styles.modalContainer}>
        <Header
          button={'close'}
          text={'Filter'}
          buttonOnPress={closeModal}
          backgroundColor={Colors.white}
        />
        <ScrollView
          style={styles.scrollview}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}>
          <FilterOption
            sort
            title={'Sort By'}
            array={sortArray}
            checkboxState={sortOrder}
            checkboxOnPress={handleSort}
          />
          <FilterOption
            title={'Brand'}
            searchText={searchBrand}
            setSearchText={setSearchBrand}
            array={filteredBrands}
            selectedItem={selectedBrands}
            checkboxOnPress={handleBrandsCheckbox}
          />
          <FilterOption
            title={'Model'}
            searchText={searchModel}
            setSearchText={setSearchModel}
            array={filteredModels}
            selectedItem={selectedModels}
            checkboxOnPress={handleModelsCheckbox}
          />
        </ScrollView>
        <AButton
          width={buttonWidth}
          height={Size.xxl}
          backgroundColor={Colors.blue}
          borderRadius={Radius.l}
          style={styles.modalButton}
          onPress={handleModal}>
          <AText
            fontSize={FontSize.xxl}
            fontWeight={FontWeight.bold}
            color={Colors.white}>
            Apply
          </AText>
        </AButton>
      </View>
    </Modal>
  );
};

export const FilterModal = memo(FilterModalComponent);

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  scrollview: {
    width: Size.full,
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: Space.m,
    paddingBottom: Size.m3xl,
  },
  modalButton: {
    position: 'absolute',
    zIndex: ZIndex.max,
    bottom: 1,
  },
});
