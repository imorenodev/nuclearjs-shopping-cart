import { Store, toImmutable } from 'nuclear-js';
import { ADD_TO_CART,
         CHECKOUT_START,
         CHECKOUT_SUCCESS,
         CHECKOUT_FAILED
       } from '../actionTypes.js';

const initialState = toImmutable({
  itemQty: {},
  pendingCheckout: {}
});


/**
 * CartStores holds the mapping of productId => quantity within itemQty
 * and also maintains rollback information for the checkout process
 */

export default Store({
  getInitialState() {
    return initialState;
  },

  initialize() {
    this.on(ADD_TO_CART, addToCart);
    this.on(CHECKOUT_FAILED, rollback);
    this.on(CHECKOUT_START, beginCheckout);
    this.on(CHECKOUT_SUCCESS, finishCheckout);
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

function beginCheckout(state) {
  // snapshot the current itemQty map for a potential rollback
  const currentItems = state.get('itemQty');

  return state
    .set('itemQty', toImmutable({}))
    .set('pendingCheckout', currentItems);
}

function finishCheckout(state) {
  // on success revert CartStore to its initial state
  // discarding now unneeded rollback state
  return initialState;
}

function rollback(state) {
  // in the case of rollback restore the cart
  // contents and discard rollback information
  return state
    .set('itemQty', state.get('pendingCheckout'))
    .set('pendingCheckout', toImmutable({}));
}
