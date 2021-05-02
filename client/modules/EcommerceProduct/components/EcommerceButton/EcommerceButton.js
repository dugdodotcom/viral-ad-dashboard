import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function EcommerceButton(props) {
  const product = props.product

  // button in different mode
  let button;

  // for choose button style
  let buttonStyle = "btn-outline-secondary";
  let buttonText = (
    <span>
      Unchosen <FontAwesomeIcon icon="eye-slash" />
    </span>
  )
  if (props.chooses && props.chooses.includes(props.product.id)) {
    buttonStyle = "btn-outline-success";
    buttonText = (
      <span>
        Chosen <FontAwesomeIcon icon="eye" />
      </span>
    )
  }

  if (props.mode == 0) {
    button =  <div className="row">
                <div className="col-6">
                  <Link to={`/sell/review/${product.id}`} >
                    <button type="button" className="btn btn-outline-primary btn-block">Review</button>
                  </Link>
                </div>
                <div className="col-6">
                  <button 
                    type="button" 
                    className="btn btn-outline-danger btn-block" 
                    onClick={props.onDelete}
                  >
                    Request Sample
                  </button>
                </div>
              </div>
  } else if (props.mode == 2) {
    button =  <div className="row">
                <div className="col-12 text-center">
                  <button type="button" className={`btn ${buttonStyle}`} onClick={props.onChoose}>
                    {buttonText}
                  </button>
                </div>
              </div>
  } else if(props.mode == 3) {
    button =  <div className="row">
                <div className="col-3">
                  <Link to={`/sell/my-webpage/your-own/edit/${product.id}`} >
                    <button type="button" className="btn btn-outline-primary btn-block">Edit</button>
                  </Link>
                </div>
                <div className="col-4">
                  <button 
                    type="button" 
                    className="btn btn-outline-danger btn-block" 
                    onClick={props.onDelete}
                  >
                    Remove
                  </button>
                </div>
                <div className="col-5">
                  <button type="button" className={`btn btn-block ${buttonStyle}`} onClick={props.onChoose}>
                    {buttonText}
                  </button>
                </div>
                
              </div>
  } else {
    button =  <div className="row">
                <div className="col-6">
                  <Link to={`/ecommerce/edit/${product.id}`} >
                    <button type="button" className="btn btn-outline-primary btn-block">Edit</button>
                  </Link>
                </div>
                <div className="col-6">
                  <button 
                    type="button" 
                    className="btn btn-outline-danger btn-block" 
                    onClick={props.onDelete}
                  >
                    Remove
                  </button>
                </div>
                
              </div>
  }
  return (
    <div>
      {button}
    </div>
  );
}

EcommerceButton.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
  }),
  mode: PropTypes.number,
  onDelete: PropTypes.func.isRequired,
  chooses: PropTypes.array,
  onChoose: PropTypes.func.isRequired,
};

export default EcommerceButton;
