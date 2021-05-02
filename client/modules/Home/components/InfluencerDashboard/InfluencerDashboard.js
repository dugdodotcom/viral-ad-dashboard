import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export class InfluencerDashboard extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <h2>Sushivid Dashboard</h2>
        <ul className={`row dashboard-box`}>
          <li className="col-3">
            <a className="the-box">
              <h3>
                Invited
              </h3>
            </a>
          </li>
          <li className="col-3">
            <a className="the-box">
              <h3>
                Propose
              </h3>
            </a>
          </li>
          <li className="col-3">
            <a className="the-box">
              <h3>
                Share
              </h3>
            </a>
          </li>
          <li className="col-3">
            <Link to="/sell" className="the-box">
              <h3>
                Sell
              </h3>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default connect()(InfluencerDashboard);
