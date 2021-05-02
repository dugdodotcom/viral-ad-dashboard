import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Component
import ProductList from '../../../EcommerceProduct/components/ProductList/ProductList';

// Import Actions
import { fetchGlobalProducts } from '../../../EcommerceProduct/EcommerceActions';

// Import Reducer
import { getProducts } from '../../../EcommerceProduct/EcommerceReducer';

export class SellListPage extends Component {
  componentDidMount() {
    if (!this.props.products || this.props.products.length == 0) {
      this.props.dispatch(fetchGlobalProducts());
    } 
  }

  render() {
    return (
      <div>
        <ProductList mode={0} products={this.props.products} />
      </div>    
    );
  }
  
}

// Actions required to provide data for this component to render in server side.
SellListPage.need = [() => { return fetchGlobalProducts(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    products: getProducts(state),
  };
}

SellListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(SellListPage);