import React from 'react';
import ProductsItem from '../../common/components/ProductItem';
import ProductsList from '../../common/components/ProductList';
import reactor from '../reactor';
import getters from '../getters';
import actions from '../actions';

const ProductItemContainer = React.createClass({
  onAddToCartClicked() {
    actions.addToCart(this.props.product);
  },
  render() {
    return (
      <ProductsItem product={this.props.product} onAddToCartClicked={this.onAddToCartClicked} />
    );
  }
});

export default React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      products: getters.products
    };
  },
  render() {
    return(
      <ProductsList title="Flux Show Demo (NuclearJS)">
        {this.state.products.map(product => {
          return <ProductItemContainer key={product.get('id')} product={product.toJS()} />
        }).toList()}
      </ProductsList>
    );
  }
})
