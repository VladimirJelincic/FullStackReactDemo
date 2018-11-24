import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { showLikes } from './util';
import * as actions from '../actions/userActions';
import './form.css';
class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  render() {
    const { user } = this.props;

    if (user) {
      return (
        <div className="form-signin">
          <h2>{user.email}</h2>
          <p className="badge">Likes {user.likes}</p>
          {showLikes(user)}
          <br />
          <Link to={`/users`}>
            <i className="glyphicon glyphicon-backward" />
          </Link>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.users.showUser
  };
};
export default connect(
  mapStateToProps,
  actions
)(User);
