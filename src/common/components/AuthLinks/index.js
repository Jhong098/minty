import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Button from '@material-ui/core/Button';
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

class AuthLinks extends React.Component {
  onLogout = e => {
    e.preventDefault();
    const { logoutUser, history } = this.props;
    logoutUser(history);
  }

  getAuthLinks = () => (
    <Button css={linkStyle} onClick={this.onLogout}>
      Logout
    </Button>
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
