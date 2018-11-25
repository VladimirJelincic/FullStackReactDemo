import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/authActions';
import './form.css';
import { renderField, validateEmail } from './util';
class Signup extends Component {
  componentWillMount = () => {
    this.props.clearErrorMessage();
  };

  onSubmit = formProps => {
    this.props.signup(formProps, () => {
      this.props.history.push('/');
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h4>Signup</h4>
        <form className="form-signin" onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <label>Email</label>
            <Field name="email" type="text" component={renderField} autoComplete="none" />
          </fieldset>
          <fieldset>
            <label>Password</label>
            <Field name="password" type="password" component={renderField} autoComplete="none" />
          </fieldset>
          <fieldset className="field-set">
            <label>Confirm Password</label>
            <Field name="password2" type="password" component={renderField} autoComplete="none" />
          </fieldset>
          <br />
          <button className="btn btn-primary">Sign Up!</button>
          <div>
            <p className="text-danger">{this.props.errorMessage}</p>
          </div>
        </form>
      </div>
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
  if (!values.password2) {
    errors.password2 = 'Please confirm password';
  }
  if (values.password && values.password2 && values.password !== values.password2) {
    errors.password2 = 'Please ensure that passwords match';
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
  reduxForm({ validate, form: 'signup' })
)(Signup);
