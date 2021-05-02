import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

// Import style
import style from '../../../Sell/pages/SellPage/SellPage.css';

// Import Componentes
import CategoryList from '../../../Sell/components/CategoryList/CategoryList';

export class FromListProductPage extends Component {

  render() {
    return (
      <div className="row high-height">
        <div className="col-3 db-border-right">
          <ol className={`nav flex-column ${style['lower-bullet']}`}>
            <CategoryList />
          </ol>
          
        </div>
        <div className="col">
          {this.props.children}
        </div>
      </div>
    );
  }
}

FromListProductPage.propTypes = {
  children: PropTypes.object.isRequired,
};

export default connect()(FromListProductPage);
