import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// get components
import BrandDashboard from '../../components/BrandDashboard/BrandDashboard';
import InfluencerDashboard from '../../components/InfluencerDashboard/InfluencerDashboard';

export class Home extends Component {
  componentDidMount() {
  }

  render() {
    let pages = "Loading...";
    if (this.props.user.mode == 0) {
      pages = <InfluencerDashboard />
    } else {
      pages = <BrandDashboard />
    }
    return (
      <div>
        {pages}
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
Home.need = [];
Home.propTypes = {
  user: PropTypes.object
}

export default connect()(Home);
