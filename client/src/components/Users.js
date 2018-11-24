import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions/userActions';

class Users extends Component {
  componentDidMount = () => {
    if (this.props.authorized) {
      this.props.getMe(() => {
        this.props.getUsers();
      });
    } else {
      this.props.getUsers();
    }
  };

  renderLike = (user, currentUser) => {
    if (!currentUser || currentUser._id === user._id || !this.props.authorized) {
      return (
        <button className="btn btn-default btn-sm" disabled>
          Like&nbsp; <i className="glyphicon glyphicon-thumbs-up" />
        </button>
      );
    } else {
      const isLiked = user.likedBy.find(e => e._id === currentUser._id);
      if (isLiked) {
        return (
          <button className="btn btn-info btn-sm" onClick={() => this.unLikeUser(user._id, currentUser)}>
            Unlike&nbsp; <i className="glyphicon glyphicon-thumbs-up" />
          </button>
        );
      } else {
        return (
          <button className="btn btn-primary btn-sm" onClick={() => this.likeUser(user._id, currentUser)}>
            Like&nbsp; <i className="glyphicon glyphicon-thumbs-up" />
          </button>
        );
      }
    }
  };
  likeUser = (id, user) => {
    if (user) {
      this.props.likeUser(id, user);
    }
  };
  unLikeUser = (id, user) => {
    if (user) {
      this.props.unLikeUser(id, user);
    }
  };

  renderUsers() {
    const { users } = this.props;

    return users.map(e => {
      return (
        <li className="list-group-item" key={e._id}>
          <span className="text text-info" style={{ marginRight: '20px' }}>
            <Link to={`/user/${e._id}`}> {e.email}</Link>
          </span>
          {this.renderLike(e, this.props.user)}
          <span className="badge">Likes {e.likes}</span>
        </li>
      );
    });
  }
  render() {
    if (this.props.users) {
      return (
        <div>
          <h4>Users</h4>
          {!this.props.user && <p>Login to access features</p>}
          <ul className="list-group">{this.renderUsers()}</ul>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = state => {
  return { authorized: state.auth.authenticated, users: state.users.usersList, user: state.users.user };
};

export default connect(
  mapStateToProps,
  actions
)(Users);
