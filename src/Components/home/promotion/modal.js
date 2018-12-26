import React, { Component } from 'react';
import classNames from 'classnames';
import Enroll from './Enroll';

class Modal extends Component {
  state = {
    isActive: ''
  };
  modalOpen = () => {
    this.setState({
      isActive: 'is-active'
    });
  };

  modalClose = () => {
    this.setState({
      isActive: ''
    });
  };

  render() {
    return (
      <div className={classNames('modal', this.state.isActive)}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Contact me</p>
            <button
              className="delete"
              onClick={this.modalClose}
              aria-label="close"
            />
          </header>
          <section className="modal-card-body">
            <Enroll />
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success">Save changes</button>
            <button className="button">Cancel</button>
          </footer>
        </div>
      </div>
    );
  }
}

export default Modal;
