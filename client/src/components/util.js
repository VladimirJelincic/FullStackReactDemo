import React, { Fragment } from 'react';

export const validateEmail = email => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

export const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <Fragment>
    <label>{label}</label>
    <input {...input} placeholder={label} type={type} className="form-control" />
    {touched && error && <p className="text-danger">{error}</p>}
  </Fragment>
);
