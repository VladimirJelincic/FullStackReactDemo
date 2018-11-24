import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/authActions';

class Signout extends Component {
  componentDidMount() {
    this.props.logout();
    setTimeout(() => this.props.history.push('/'), 1200);
  }

  render() {
    return (
      <div>
        <h4>Bye....</h4>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Signout);
