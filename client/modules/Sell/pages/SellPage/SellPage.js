import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

// Import style
import style from './SellPage.css';

// Import Componentes
import CategoryList from '../../components/CategoryList/CategoryList';

export class SellPage extends Component {

  render() {
    return (
      <div className="row high-height">
        <div className="col-3 db-border-right">
          <ol className={`nav flex-column ${style['lower-bullet']}`}>
            <CategoryList />
            <li>
              <Link className="nav-link pl-0" activeClassName={'active'} to={'/sell/my-performance'} >
                My Performance
              </Link>
            </li>
            <li>
              <Link className="nav-link pl-0" activeClassName={'active'} to={'/sell/my-webpage'} >
                My Webpage
              </Link>
            </li>
          </ol>
          
        </div>
        <div className="col">
          {this.props.children}
        </div>
      </div>
    );
  }
}

SellPage.propTypes = {
  children: PropTypes.object.isRequired,
};

export default connect()(SellPage);
