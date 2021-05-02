import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class BrandDashboard extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, { user: this.props.user })}
      </div>
    );
  }
}

export default connect()(BrandDashboard);
