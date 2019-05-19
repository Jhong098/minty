import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { logoutUser } from '../../actions/AuthActions';

const linkStyle = css`
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;

  &:hover {
    color: grey;
  }
`;

const avatarStyle = css`
  border-radius: 50%;
  width: 25px;
  margin-right: 15px;
`;

class AuthLinks extends React.Component {
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.router)
  }

  getAuthLinks = (user) => (
    <button css={css`${linkStyle}`} onClick={this.onLogout}>
      <img css={css`${avatarStyle}`} src={user.avatar} alt={user.name} title={user.name} />
      Logout
    </button>
  );

  getGuestLinks = () => (
    <React.Fragment>
      <Link css={css`${linkStyle} margin-right: 20px;`} to="/register">Register</Link>
      <Link css={linkStyle} to="/login">Login</Link>
    </React.Fragment>
  );

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = this.getAuthLinks(user);
    const guestLinks = this.getGuestLinks();

    return (
      <div css={css`display: flex; margin-left: auto; margin-right: 2%;`}>
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(AuthLinks));
