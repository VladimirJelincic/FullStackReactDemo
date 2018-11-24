import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions/userActions';

class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }
  showLikes = user => {
    if (user.likes > 0) {
      return (
        <div>
          <h5>Liked By</h5>
          <ul>
            {user.likedBy.map(e => (
              <li>{e.email}</li>
            ))}
          </ul>
        </div>
      );
    }
  };
  render() {
    const { user } = this.props;

    if (user) {
      return (
        <div>
          <h2>{user.email}</h2>
          <p className="badge">Likes {user.likes}</p>
          {this.showLikes(user)}
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
