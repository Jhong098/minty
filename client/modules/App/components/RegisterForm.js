import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../AppActions';
import classnames from 'classnames';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirm: '',
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    };
    this.props.registerUser(user);
    console.log(user);
  }

  render() {
    return (
      <div className="container" style={{ marginTop: '50px', width: '700px'}}>
        <h2 style={{ marginBottom: '40px' }}>Registration</h2>
        <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              name="name"
              onChange={ this.handleInputChange }
              value={ this.state.name }
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              name="email"
              onChange={ this.handleInputChange }
              value={ this.state.email }
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              name="password"
              onChange={ this.handleInputChange }
              value={ this.state.password }
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              name="password_confirm"
              onChange={ this.handleInputChange }
              value={ this.state.password_confirm }
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(Register);
