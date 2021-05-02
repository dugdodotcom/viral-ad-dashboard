import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

export class EcommercePage extends Component {

  render() {
    return (
      <div className="row high-height">
        <div className="col-3 db-border-right">
          <nav className="nav flex-column">
            <Link className="nav-link" activeClassName={'active'} to={'/ecommerce'} >
              View all my product
            </Link>
            <Link className="nav-link" activeClassName={'active'} to={'/ecommerce/add'} >
              Upload new product
            </Link>
            <a className="nav-link" href="#">Shipments</a>
            <a className="nav-link" href="#">Performance report</a>
          </nav>
        </div>
        <div className="col">
          {this.props.children}
        </div>
      </div>
    );
  }
}

EcommercePage.propTypes = {
  children: PropTypes.object.isRequired,
};

export default connect()(EcommercePage);
