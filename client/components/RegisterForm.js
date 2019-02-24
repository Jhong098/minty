import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { registerUser } from '../modules/App/AppActions';
import classnames from 'classnames';
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
    console.log(nextProps)
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
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm,
    };
    this.props.registerUser(user, this.props.history);
    console.log(user);
  }

  render() {
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
              value={this.state.name}
              css={inputStyle}
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
              value={this.state.email}
              css={inputStyle}
              error={!!errors.email}
            />
            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
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
              value={this.state.password}
              css={inputStyle}
            />
            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
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
              value={this.state.password_confirm}
              css={inputStyle}
            />
            {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
