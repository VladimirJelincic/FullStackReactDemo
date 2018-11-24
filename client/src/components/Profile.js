import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/userActions';
import * as authActions from '../actions/authActions';
import { showLikes } from './util';
import './form.css';
import { renderField } from './util';
class Profile extends Component {
  componentWillMount = () => {
    this.props.getMe(() => this.props.clearErrorMessage());
  };

  onSubmit = formProps => {
    this.props.changePassword(formProps);
    // , () => {
    //   this.props.history.push('/');
    // });
  };

  render() {
    const { handleSubmit, user } = this.props;
    if (user) {
      return (
        <div>
          <div className="form-signin">
            <h2>{user.email}</h2>
            <p className="badge">Likes {user.likes}</p>
            {showLikes(user)}
            <br />
          </div>
          <form className="form-signin" onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
              <label>Password</label>
              <Field name="password" type="password" component={renderField} autoComplete="none" />
            </fieldset>
            <fieldset className="field-set">
              <label>Confirm Password</label>
              <Field name="password2" type="password" component={renderField} autoComplete="none" />
            </fieldset>
            <br />
            <button className="btn btn-primary">Change Password</button>
            <div>
              <p className="text-danger">{this.props.errorMessage}</p>
            </div>
            <div>
              <span className="text-success">{this.props.message}</span>
            </div>
          </form>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}
const validate = values => {
  const errors = {};

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
  return { errorMessage: state.auth.errorMessage, user: state.users.user, message: state.auth.message };
};

export default compose(
  connect(
    mapStateToProps,
    { ...actions, ...authActions }
  ),
  reduxForm({ validate, form: 'change', enableReinitialize: true })
)(Profile);
