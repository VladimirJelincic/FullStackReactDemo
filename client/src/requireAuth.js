import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
  class Authentication extends Component {
    componentDidMount() {
      this.shouldLeave();
    }

    componentDidUpdate() {
      this.shouldLeave();
    }

    shouldLeave() {
      if (!this.props.auth) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
};
