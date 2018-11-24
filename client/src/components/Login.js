import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/authActions';
import './form.css';
import { renderField, validateEmail } from './util';
class Login extends Component {
  onSubmit = formProps => {
    this.props.login(formProps, () => {
      this.props.getMe(() => this.props.history.push('/'));
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form className="form-signin" onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Email</label>
          <Field name="email" type="text" component={renderField} autoComplete="none" />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field name="password" type="password" component={renderField} autoComplete="none" />
        </fieldset>
        <br />
        <button className="btn btn-primary">Login</button>
        <div>
          <p className="text-danger">{this.props.errorMessage}</p>
        </div>
      </form>
    );
  }
}
const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Please enter email address';
  } else {
    if (!validateEmail(values.email)) {
      errors.email = 'Please enter valid email address';
    }
  }
  if (!values.password) {
    errors.password = 'Please enter password';
  }

  return errors;
};
const mapStateToProps = state => {
  return { errorMessage: state.auth.errorMessage };
};

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ validate, form: 'login' })
)(Login);
