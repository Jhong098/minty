import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Button from '@material-ui/core/Button';
import close from '../../../assets/close.svg';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';

export class AppBarModal extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleOpenModal} color="inherit">{this.props.name}</Button>
        <ReactModal
          style={{
            overlay: {
              zIndex: 1000000,
            },
          }}
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
        >
          <img style={{ cursor: 'pointer' }} src={close} alt="close" onClick={this.handleCloseModal} />
          {this.props.children}
        </ReactModal>
      </div>
    );
  }
}

export default AppBarModal;
