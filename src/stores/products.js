import {observable, action, makeObservable, runInAction} from 'mobx';
import {makePersistable} from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fetch from '@utils/Fetch';

class ProductStore {
  //observable
  products = [];

  //observable
  productsInCart = [];

  //observable
  likedProducts = [];

  constructor() {
    makeObservable(this, {
      products: observable,
      productsInCart: observable,
      likedProducts: observable,

      getProducts: action,
      toggleInCart: action,
      changeCountOfProduct: action,
      calculatedTotalPrice: action,
      toggleLikedProducts: action,
    });

    makePersistable(this, {
      name: 'ProductsPersistStore',
      properties: ['productsInCart', 'likedProducts'],
      storage: AsyncStorage,
    });
  }

  //action
  getProducts = async (currentPage, itemsPerPage) => {
    try {
      const response = await Fetch.get('/products');
      const data = response.data;
      runInAction(() => {
        this.products = data.slice(0, currentPage * itemsPerPage);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //action
  toggleInCart = async (product, productExists) => {
    try {
      runInAction(() => {
        if (productExists) {
          let newProductsInCart = this.productsInCart.filter(
            item => item.id != product.id,
          );
          this.productsInCart = newProductsInCart;
        } else {
          let newProductsInCart = this.productsInCart;
          const countAddToProduct = {...product, count: 1};
          newProductsInCart.push(countAddToProduct);
          this.productsInCart = newProductsInCart;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  //action
  changeCountOfProduct = async (option, productId) => {
    try {
      runInAction(() => {
        if (option == 'increase') {
          const index = this.productsInCart.findIndex(
            product => product.id === productId,
          );
          if (index !== -1) {
            this.productsInCart[index].count += 1;
          }
        } else {
          const index = this.productsInCart.findIndex(
            product => product.id === productId,
          );
          if (index !== -1 && this.productsInCart[index].count > 1) {
            this.productsInCart[index].count -= 1;
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  //action
  calculatedTotalPrice = () => {
    return this.productsInCart.reduce(
      (total, product) => total + product.count * parseFloat(product.price),
      0,
    );
  };

  //action
  toggleLikedProducts = async (product, productExists) => {
    try {
      runInAction(() => {
        if (productExists) {
          let newLikedProducts = this.likedProducts.filter(
            item => item.id != product.id,
          );
          this.likedProducts = newLikedProducts;
        } else {
          let newLikedProducts = this.likedProducts;
          newLikedProducts.push(product);
          this.likedProducts = newLikedProducts;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const productStore = new ProductStore();
