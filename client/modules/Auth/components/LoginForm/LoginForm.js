import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// import component
import { Form } from '../../../Form/pages/Form';

// Import Style
// import bootStyle from '../../../../Main';

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  submitLogin = () => {
    const emailRef = this.refs.email;
    const passwordRef = this.refs.password;

    if (emailRef.value && passwordRef.value) {
      this.props.submitLogin(emailRef.value, passwordRef.value);
    }
  }

  render() {
    return (
      <div>
        <Form submit={this.submitLogin}>
          <div className={'form-group'}>
            <label htmlFor="input-email">
              <FormattedMessage id="emailAddress" />
            </label>
            <input
              required
              name={"email"}
              type={"email"}
              className={'form-control'}
              id="input-email"
              placeholder={this.props.intl.messages.enterEmail}
              ref="email"
            />
            <div className={'invalid-feedback'}>
              {this.props.showErrorForm && this.props.showErrorForm.email &&
                <FormattedMessage id={this.props.showErrorForm.email} />
              }
            </div>
          </div>
          <div className={'form-group'}>
            <label htmlFor="input-password"><FormattedMessage id="password" /></label>
            <input
              required
              name={"password"}
              type={"password"}
              // minLength={6}
              // pattern="(?=.*\d)(?=.*[a-z]).{6,}"
              className={'form-control'}
              id="input-password"
              placeholder={this.props.intl.messages.password}
              ref="password"
            />
            <small className={'form-text text-muted'}>Must be at least 6 characters long, contain letters and numbers</small>
            <div className={'invalid-feedback'}>
              {this.props.showErrorForm && this.props.showErrorForm.password &&
                <FormattedMessage id={this.props.showErrorForm.password} />
              }
            </div>
          </div>
          <button type={"submit"} className={'btn btn-primary'}><FormattedMessage id="submit" /></button>
        </Form>

        <div className="row mt-2">
          <div className="col-12">
          <button type="button" className="btn btn-info" onClick={() => {this.props.fetchToggle(2)}}>Are you influencer?</button>
          </div>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  submitLogin: PropTypes.func.isRequired,
  showErrorForm: PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(LoginForm);
