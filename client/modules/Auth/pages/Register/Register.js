import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LoginInfluencer from '../../components/LoginInfluencer/LoginInfluencer';

// Import Actions
import { signupRequest } from '../../AuthActions';

// Import Selectors
import { getErrorForm } from '../../../Form/FormReducer';
import { getSignup } from '../../AuthReducer';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {mode: 1};
  }

  handleRegister = (email, password) => {
    this.props.dispatch(signupRequest({ email, password }));
  };

  fetchToggle=(mode)=>{
    this.setState({
     mode: mode
    })
  }

  render() {
    let page;
    if (this.state.mode == 1) {
      page = <RegisterForm submitRegister={this.handleRegister} showErrorForm={this.props.showErrorForm} fetchToggle={this.fetchToggle} />
    } else {
      page = <LoginInfluencer fetchToggle={this.fetchToggle} />
    }
    return (
      <div>
        {page}
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showErrorForm: getErrorForm(state),
    showSignup: getSignup(state),
  };
}

Register.propTypes = {
  showSignup: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  showErrorForm: PropTypes.object,
};

Register.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(Register);