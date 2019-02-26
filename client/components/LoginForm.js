import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';


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

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(user);
  }

  render() {
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
              value={ this.state.email }
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
              value={ this.state.password }
              css={inputStyle}
            />
          </div>
          <div className="form-group">
            <Button css={buttonStyle} variant="contained" type="submit" color="primary">
              Login
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
