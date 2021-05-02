import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class InfluencerDashboard extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className={`row high-height`}>
        <div className={`col-2 db-border-right vertical-text`}>
          <h3>New Campaign</h3>
        </div>
        <div className="col">
          {React.cloneElement(this.props.children, { user: this.props.user })}
        </div>
      </div>
    );
  }
}

export default connect()(InfluencerDashboard);
