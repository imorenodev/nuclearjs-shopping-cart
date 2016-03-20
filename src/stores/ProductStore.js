import { Store, toImmutable } from 'nuclear-js';
import { RECEIVE_PRODUCTS, ADD_TO_CART } from '../actionTypes.js';

// exmple product:
// {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2, "image": "../common/assets/ipad-mini.png"}

export default Store({
  getInitialState() {
    return toImmutable({});
  },

  initialize() {
    this.on(RECEIVE_PRODUCTS, receiveProducts);
    this.on(ADD_TO_CART, decrementInventory);
  }
});

// All store handlers transform `(currentState, payload) => (newState)`

/**
 * Transforms an array of products to a map keyed by product.id, and merges
 * it with the current state.
 */

function receiveProducts(state, { products }) {
  let newProducts = toImmutable(products)
    .toMap()
    .mapKeys((k, v) => v.get('id'));
  return state.merge(newProducts);
}

/**
 * Decrements the inventory for a product by 1, unless that product
 * has no more inventory.
 */

function decrementInventory(state, { product }) {
  return state.update(product.id, product => {
    let currentInventory = product.get('inventory');
    let newInventory = currentInventory > 0 ? currentInventory - 1 : 0;
    return product.set('inventory', newInventory);
  });
}
