import React, { Component } from 'react';
import { connect } from 'react-redux';

import classnames from 'classnames';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import { registerUser } from '../../actions/AuthActions';

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

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirm: '',
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, password_confirm } = this.state;
    const { registerUser, history } = this.props;
    const user = {
      name,
      email,
      password,
      password_confirm
    };
    console.log("submitting")
    registerUser(user, history);
  }

  render() {
    const { name, email, password, password_confirm } = this.state;
    const { errors } = this.state;
    return (
      <div className="container" css={containerStyle}>
        <h2 style={{ marginBottom: '40px' }}>Registration</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <Input
              type="text"
              placeholder="Name"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.name,
              })}
              name="name"
              onChange={this.handleInputChange}
              value={name}
              css={inputStyle}
              error={!!errors.name}
            />
            {/* {errors.name && (<div className="invalid-feedback">{errors.name}</div>)} */}
          </div>
          <div className="form-group">
            <Input
              type="email"
              placeholder="Email"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.email,
              })}
              name="email"
              onChange={this.handleInputChange}
              value={email}
              css={inputStyle}
              error={!!errors.email}
            />
            {/* {errors.email && (<div className="invalid-feedback">{errors.email}</div>)} */}
          </div>
          <div className="form-group">
            <Input
              type="password"
              placeholder="Password"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.password,
              })}
              name="password"
              onChange={this.handleInputChange}
              value={password}
              css={inputStyle}
              error={!!errors.password}
            />
            {/* {errors.password && (<div className="invalid-feedback">{errors.password}</div>)} */}
          </div>
          <div className="form-group">
            <Input
              type="password"
              placeholder="Confirm Password"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.password_confirm,
              })}
              name="password_confirm"
              onChange={this.handleInputChange}
              value={password_confirm}
              css={inputStyle}
              error={!!errors.password_confirm}
            />
            {/* {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)} */}
          </div>
          <div className="form-group" css={buttonStyle}>
            <Button variant="contained" type="submit" color="primary">
              Register
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.auth.errors
  };
};

export default connect(mapStateToProps, { registerUser })(Register);
