import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Component
import ProductList from '../../components/ProductList/ProductList';

// Import Actions
import { fetchProducts } from '../../EcommerceActions';

// Import Reducer
import { getProducts } from '../../EcommerceReducer';

export class ProductListPage extends Component {
  componentDidMount() {
    if (!this.props.products || this.props.products.length == 0) {
      this.props.dispatch(fetchProducts());
    } 
  }

  handleDeleteProduct = post => {
    if (confirm('Do you want to delete this product')) {
      this.props.dispatch(deleteProductRequest(post));
    }
  };

  render() {
    return (
      <div>
        <ProductList mode={1} products={this.props.products} />
      </div>    
    );
  }
  
}

// Actions required to provide data for this component to render in server side.
ProductListPage.need = [() => { return fetchProducts(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    products: getProducts(state),
  };
}

ProductListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ProductListPage);