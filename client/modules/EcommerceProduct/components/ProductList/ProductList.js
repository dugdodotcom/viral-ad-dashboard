import React from 'react';
import PropTypes from 'prop-types';

// Import component
import ProductListItem from '../ProductListItem/ProductListItem';


function ProductList(props) {

  return (
    <div className="row">
      {
        props.products.map((product, index) => (
          <ProductListItem
            index={index}
            product={product}
            key={product.id}
            onDelete={() => this.handleDeleteProduct(product.id)}
            onChoose={() => props.handleChooseProduct(product.id)}
            chooses={props.chooses}
            mode={props.mode}
          />
        ))
      }
    </div>
  );
}

ProductList.propTypes = {
  chooses: PropTypes.array,
  mode: PropTypes.number,
  handleChooseProduct: PropTypes.func,
  handleDeleteProduct: PropTypes.func,
  products: PropTypes.array.isRequired,
};

export default ProductList;
