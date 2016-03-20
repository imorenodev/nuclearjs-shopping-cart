import shop from '../common/api/shop';
import reactor from './reactor.js';
import { RECEIVE_PRODUCTS,
         ADD_TO_CART,
         CHECKOUT_START,
         CHECKOUT_SUCCESS,
         CHECKOUT_FAILED
       } from './actionTypes.js';

export default {
  fetchProducts() {
    shop.getProducts(products => {
      reactor.dispatch(RECEIVE_PRODUCTS, { products })
    });
  },

  addToCart(product) {
    reactor.dispatch(ADD_TO_CART, { product })
  }
}
