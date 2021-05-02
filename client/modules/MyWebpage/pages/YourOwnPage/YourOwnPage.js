import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

export class YourOwnPage extends Component {

  render() {
    return (
      <div className="row high-height">
        <div className="col-3 db-border-right">
          <nav className="nav flex-column">
            <Link className="nav-link" activeClassName={'active'} to={'/sell/my-webpage/your-own/view'} >
              View all my product
            </Link>
            <Link className="nav-link" activeClassName={'active'} to={'/sell/my-webpage/your-own'} >
              Upload new product
            </Link>
          </nav>
        </div>
        <div className="col">
          {React.cloneElement(this.props.children, 
            { 
              redirectUrl: '/sell/my-webpage/your-own/view'
            }
          )}
        </div>
      </div>
    );
  }
}

YourOwnPage.propTypes = {
  children: PropTypes.object.isRequired,
};

export default connect()(YourOwnPage);
