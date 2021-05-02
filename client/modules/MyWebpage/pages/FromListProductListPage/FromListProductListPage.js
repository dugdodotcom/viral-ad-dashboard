
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Component
import ProductList from '../../../EcommerceProduct/components/ProductList/ProductList';

// Import Actions
import { editChooseRequest, fetchChooses } from '../../MyWebpageActions';
import { fetchGlobalProducts } from '../../../EcommerceProduct/EcommerceActions';

// Import Reducer
import { getChooses } from '../../MyWebpageReducer';
import { getProducts } from '../../../EcommerceProduct/EcommerceReducer';

export class FromListProductListPage extends Component {
  componentDidMount() {
    if (!this.props.products || this.props.products.length == 0) {
      this.props.dispatch(fetchGlobalProducts());
    }
    if (!this.props.chooses || this.props.chooses.length == 0) {
      this.props.dispatch(fetchChooses());
    }
  }

  handleChooseProduct = product => {
    this.props.dispatch(editChooseRequest(product))
  }

  render() {
    return (
      <div>
        <ProductList mode={2} handleChooseProduct={this.handleChooseProduct} chooses={this.props.chooses} products={this.props.products}/>
      </div>    
    );
  }
}

// Actions required to provide data for this component to render in sever side.
FromListProductListPage.need = [() => { return fetchGlobalProducts(); },() => { return fetchChooses(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    products: getProducts(state),
    chooses: getChooses(state),
  };
}

FromListProductListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(FromListProductListPage);
