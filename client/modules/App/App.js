import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import Header from './components/Header/Header';
import BrandDashboard from './Components/BrandDashboard/BrandDashboard';
import InfluencerDashboard from './Components/InfluencerDashboard/InfluencerDashboard';

// Import Selectors
import { getUser } from './AppReducer';

// Import Action
import { fetchUser } from './AppActions';

let DevTools;
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  DevTools = require('./components/DevTools').default;
}

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
    if (!this.props.user.mode) {
      this.props.dispatch(fetchUser());
    }
  }

  render() {
    console.log("re render");
    let pages = "Loading";
    
      if (this.props.user.mode == 0) {
        pages = <InfluencerDashboard user={this.props.user} children={this.props.children}/>
      } else {
        pages = <BrandDashboard user={this.props.user} children={this.props.children}/>
      }
    
    
    return (
      <div>
        {/* {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />} */}
        <Header
          location={this.props.location}
        />
        <div className="container">
          {pages}
        </div>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
App.need = [() => { return fetchUser(); }];

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
    user: getUser(store),
  };
}

export default connect(mapStateToProps)(App);
