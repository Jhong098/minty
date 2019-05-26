import React, { Component } from 'react';
import { connect } from 'react-redux';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import { loginUser } from '../../actions/AuthActions';


const containerStyle = css`
  padding: 10%;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const inputStyle = css`
  margin: 20px;
`;

const buttonStyle = css`
  margin: 20px;
  display: flex;
  justify-content: center;
`;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  componentWillReceiveProps({ errors }) {
    if (errors) {
      this.setState({
        errors
      });
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    const { email, password } = this.state;
    const { loginUser, history } = this.props;
    e.preventDefault();
    const user = {
      email,
      password
    };
    loginUser(user, history);
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="container" css={containerStyle}>
        <h2 style={{ marginBottom: '40px' }}>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <Input
              type="email"
              placeholder="Email"
              className="form-control"
              name="email"
              onChange={ this.handleInputChange }
              value={ email }
              css={inputStyle}
            />
          </div>
          <div className="form-group">
            <Input
              type="password"
              placeholder="Password"
              className="form-control"
              name="password"
              onChange={ this.handleInputChange }
              value={ password }
              css={inputStyle}
            />
          </div>
          <div className="form-group" css={buttonStyle}>
            <Button variant="contained" type="submit" color="primary">
              Login
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.auth.errors
})

export default connect(mapStateToProps, { loginUser })(Login);
