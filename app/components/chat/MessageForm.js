import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class MessageForm extends Component {
  constructor(props){
    super(props);

    this.onSendMessage = this.onSendMessage.bind(this);
    this.onMessageSuccess = this.onMessageSuccess.bind(this);
    this.onMessageError = this.onMessageError.bind(this);
  }

  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.messageBox).focus();
  }

  disableMessageBox(){
    let box = $(ReactDOM.findDOMNode(this.refs.messageBox));
    box.prop('disabled', 'disabled');
  }

  enableMessageBox(){
    let box = $(ReactDOM.findDOMNode(this.refs.messageBox));
    box.removeAttr('disabled');
  }

  onMessageSuccess(){
    this.enableMessageBox()
    let box = $(ReactDOM.findDOMNode(this.refs.messageBox));
    box.val('')
  }

  onMessageError(){
    this.enableMessageBox();
  }

  onSendMessage(e){
    e.preventDefault();

    let messageBox = ReactDOM.findDOMNode(this.refs.messageBox);
    let message = messageBox.value;
    if (message && message.length > 0){
      this.disableMessageBox();
      this.props.onSendMessage(message, this.onMessageSuccess, this.onMessageError);
    }
  }

  render(){
    return (
      <div className="row message-form">
        <hr />
        <form role="form" className="form" onSubmit={this.onSendMessage}>
          <div className="col-md-12">
            <input type="text" className="form-control" name="message" ref="messageBox" placeholder="Whatcha wanna say?" />
          </div>
        </form>
      </div>
    );
  }
}

export default MessageForm;
