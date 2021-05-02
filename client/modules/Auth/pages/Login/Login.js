import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import LoginChoice from '../../components/LoginChoice/LoginChoice';
import LoginForm from '../../components/LoginForm/LoginForm';
import LoginInfluencer from '../../components/LoginInfluencer/LoginInfluencer';

// Import Actions
import { loginRequest } from '../../AuthActions';

// Import Selectors
import { getErrorForm } from '../../../Form/FormReducer';
import { getLogin } from '../../AuthReducer';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {mode: 0};
  }

  handleLogin = (email, password) => {
    this.props.dispatch(loginRequest({ email, password }));
  };

  fetchToggle=(mode)=>{
    this.setState({
     mode: mode
    })
  }

  render() {
    let page;
    if (this.state.mode == 0) {
      page = <LoginChoice fetchToggle={this.fetchToggle} />
    } else if (this.state.mode == 1) {
      page = <LoginForm submitLogin={this.handleLogin} showErrorForm={this.props.showErrorForm} fetchToggle={this.fetchToggle} />
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
    showLogin: getLogin(state),
  };
}

Login.propTypes = {
  showLogin: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  showErrorForm: PropTypes.object,
};

Login.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(Login);
