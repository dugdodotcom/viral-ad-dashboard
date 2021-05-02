import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import moment from 'moment';

// Import environtment
import { ENV } from '../../../../../config/LocalEnvironment';

// Import components
import EcommerceButton from '../EcommerceButton/EcommerceButton';

function ProductListItem(props) {
  // button config
  const product = props.product;

  // content in different mode
  let content
  if (props.mode == 0) {
    content = <div>
                <div className="row">
                  <div className="col-6">
                    Price Per Sale
                  </div>
                  <div className="col-6">
                    : RM {parseInt(product.price) + parseInt(product.price * product.margin_per_sale / 100)}
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    Price Per Visit
                  </div>
                  <div className="col-6">
                    : RM {parseInt(product.price) + parseInt(product.price * product.profit_per_visitor / 100)}
                  </div>
                </div>
              </div>
  } else {
    content = <div>
                <div className="row">
                  <div className="col-6">
                    Quantity left
                  </div>
                  <div className="col-6">
                    : {product.quantity}
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    Sale Price
                  </div>
                  <div className="col-6">
                    : RM {parseInt(product.price)}
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    Influencer Margin
                  </div>
                  <div className="col-6">
                    : RM {parseInt(product.price * product.margin_per_sale / 100)}
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    Date Uploaded
                  </div>
                  <div className="col-6">
                    : {moment(product.created_at).format('DD/M/YYYY')}
                  </div>
                </div>
              </div>
  }
  return (
    <div className={`col-md-${props.mode==1?4:6} mt-3`}>
      <img 
        className="img-fluid full-img" 
        src={product.product_images_images[0]? ENV.apiUrl + product.product_images_images[0].url:''} 
      />
      <div className="m-2">
        <div className="row">
          <div className="col-6">
            Name
          </div>
          <div className="col-6">
            : {product.name}
          </div>
        </div>

        {content}

      </div>

      <EcommerceButton product={product} onDelete={props.onDelete} mode={props.mode} chooses={props.chooses} onChoose={props.onChoose} />

    </div>
  );
}

ProductListItem.propTypes = {
  product: PropTypes.shape({
    product_images_images: PropTypes.array,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    margin_per_sale: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
  mode: PropTypes.number,
  onDelete: PropTypes.func.isRequired,
};

export default ProductListItem;
