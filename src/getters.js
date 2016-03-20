// it is idiomatic to facade all data access through getters,
// that way a component only has to subscribe to a getter, 
// making it agnostic to the underlying stores and data
// transformation that is taking place.

const products = ['products'];
const cartProducts = [
  ['products'],
  ['cart', 'itemQty'],
  (products, itemQty) => {
    return itemQty.map((quantity, productId) => {
      var product = products.get(productId);
      return product
        .set('quantity', quantity)
        .remove('inventory')
    }).toList();
  }
];
const cartTotal = [
  cartProducts,
  (items) => {
    const total = items.reduce((total, item) => {
      return total + (item.get('quantity') * item.get('price'))
    }, 0) || 0;
    return total.toFixed(2);
  }
]

export default { products, cartProducts, cartTotal };
