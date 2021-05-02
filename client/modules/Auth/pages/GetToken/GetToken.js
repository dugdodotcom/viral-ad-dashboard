import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setStorage } from '../../../../helpers/cookie';

export class GetToken extends Component {
  componentDidMount() {
    setStorage("token", this.props.location.query.token);
    this.props.routes[0].history.push('/')
  } 
  render() {
    return (
      <div>
        Loading....
      </div>
    );
  }
}

export default connect()(GetToken);
