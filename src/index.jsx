import './main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import reactor from './reactor';
import ProductStore from './stores/ProductStore';
import CartStore from './stores/CartStore';
import actions from './actions';

reactor.registerStores({
  'products': ProductStore,
  'cart': CartStore
});

actions.fetchProducts();

ReactDOM.render(<App />, document.getElementById('app'));
