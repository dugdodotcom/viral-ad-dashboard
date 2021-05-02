import React, { Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

export class LoginChoice extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-2">
          <button type="button" className="btn btn-primary" onClick={() => {this.props.fetchToggle(1)}}>Brand</button>
        </div>
        <div className="row mt-2">
          <button type="button" className="btn btn-info" onClick={() => {this.props.fetchToggle(2)}}>Influencer</button>
        </div>
      </div>
    );
  }
}

export default LoginChoice;
