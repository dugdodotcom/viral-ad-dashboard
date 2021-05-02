import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// get components
import ProductForm from '../../components/ProductForm/ProductForm';

// Import Selectors
import { getCategories } from '../../../Category/CategoryReducer';
import { getImages } from '../../EcommerceReducer';

// Import Action
import { fetchCategories } from '../../../Category/CategoryActions';
import { addProductRequest, setImage } from '../../EcommerceActions';

export class ProductNewPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.categories || this.props.categories.length == 0) {
      this.props.dispatch(fetchCategories());
    }
  }

  handleAddProduct = (
    category_id,
    name,
    description,
    price,
    quantity,
    margin_per_sale,
    profit_per_visitor,
    shipping_details,
    shipping_charges,
    sizes,
    colour
  ) => {
    let formData = new FormData();
    formData.append('product[category_id]', category_id);
    formData.append('product[name]', name);
    formData.append('product[description]', description);
    formData.append('product[price]', price);
    formData.append('product[quantity]', quantity);
    formData.append('product[margin_per_sale]', margin_per_sale);
    formData.append('product[profit_per_visitor]', profit_per_visitor);
    formData.append('product[shipping_details]', shipping_details);
    formData.append('product[shipping_charges]', shipping_charges);
    formData.append('product[sizes]', sizes);
    formData.append('product[colour]', colour);

    let { images } = this.props;
    for (let i = 0; i < images.length; i++) {
      let file = images[i];
      if (file.id) {
        if (file._destroy) {
          formData.append(`product[product_images_attributes][${i}][id]`, file.id);
          formData.append(`product[product_images_attributes][${i}][_destroy]`, '1');
        }
      } else {
        formData.append(
          `product[product_images_attributes][${i}][image]`,
          file,
          file.name
        );
      }
    }
    this.props.dispatch(addProductRequest(formData, this.props.redirectUrl));
  };

  componentWillUnmount(){
    this.props.dispatch(setImage([]))
  }

  handler(data) {
    this.setState(data);
  }

  render() {
    console.log("new page props",this.props);
    return (
      <div>
        <h2>Upload new product</h2>
        <ProductForm 
          saveProduct={this.handleAddProduct} 
          product={{}} 
          categories={this.props.categories} 
          images={this.props.images}
        />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
ProductNewPage.need = [() => { return fetchCategories(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  console.log("maptoProps", state)
  return {
    categories: getCategories(state),
    images: getImages(state),
  };
}

ProductNewPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  redirectUrl: PropTypes.string,
};

export default connect(mapStateToProps)(ProductNewPage);
