import React, { Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
// Import environtment
import { ENV } from '../../../../../config/LocalEnvironment';

// Import Style
// import bootStyle from '../../../../Main';

export class LoginInfluencer extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div>
        <div className="row mt-2">
          <a href={ENV['apiUrl'] + ENV['facebookLogin']} className="col-12">
            <button type="button" className="btn btn-primary" >Login with Facebook</button>
          </a>
        </div>
        <div className="row mt-2">
          <a href={ENV['apiUrl'] + ENV['instagramLogin']} className="col-12">
            <button type="button" className="btn btn-danger" onClick={() => {this.props.fetchToggle(2)}}>Login with Instagram</button>
          </a>
        </div>
        <div className="row mt-2">
          <div className="col-12">
          <button type="button" className="btn btn-primary" onClick={() => {this.props.fetchToggle(1)}}>Are you Brand?</button>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginInfluencer;
