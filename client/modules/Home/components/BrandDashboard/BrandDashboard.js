import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export class BrandDashboard extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="row high-height">
        <div className="col-3 db-border-right">
          <h3>Toolbar</h3>
          <nav className="nav flex-column">
            <Link className="nav-link" to={'/ecommerce'} >
              E-commerce
            </Link>
            <a className="nav-link" href="#">Other CTA</a>
            <a className="nav-link" href="#">Other CTA</a>
            <a className="nav-link" href="#">Other CTA</a>
          </nav>
        </div>
        <div className="col">
        </div>
      </div>
    );
  }
}

export default connect()(BrandDashboard);
