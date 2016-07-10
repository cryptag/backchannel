import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Modal, Button, ButtonToolbar } from 'react-bootstrap';

class SetUsernameModal extends Component {
  constructor(props){
    super(props);

    this.state = {
      show: false
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
  }

  showModal() {
    this.setState({show: true});
  }

  hideModal() {
    this.setState({show: false});
  }

  updateUsername(e){
    e.preventDefault();

    let username = ReactDOM.findDOMNode(this.refs.username).value;
    this.props.onUpdateUsername(username);
    this.hideModal();
  }

  render(){
    return (
      <ButtonToolbar>
        <Button bsStyle="primary" bsSize="xsmall" onClick={this.showModal}>
          change username
        </Button>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Set Username</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form" role="form">
              <input type="text" name="username" className="form-control" ref="username" placeholder="enter username" />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModal}>Close</Button>
            <Button onClick={this.updateUsername}>Update</Button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
    )
  }
}

export default SetUsernameModal;
