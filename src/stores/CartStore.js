import { Store, toImmutable } from 'nuclear-js';
import { ADD_TO_CART } from '../actionTypes.js';

/**
 * CartStores holds the mapping of productId => quantity within itemQty
 * and also maintains rollback information for the checkout process
 */

export default Store({
  getInitialState() {
    return toImmutable({ itemQty: {} })
  },

  initialize() {
    this.on(ADD_TO_CART, addToCart);
  }
});

/**
 * Increments the quantity for an existing item by 1, 
 * or sets the quantity for a new item to 1.
 */

function addToCart(state, { product }) {
  let id = product.id;
  return (state.hasIn(['itemQty', id]))
    ? state.updateIn(['itemQty, id'], quantity => quantity + 1)
    : state.setIn(['itemQty', id], 1);
}

