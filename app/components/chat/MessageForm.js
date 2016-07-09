import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class MessageForm extends Component {
  constructor(props){
    super(props);

    this.onSendMessage = this.onSendMessage.bind(this);
  }

  onSendMessage(e){
    e.preventDefault();

    // this approach is only marginally less shitty than
    // passing the value up the component tree on each keystroke.
    let messageBox = ReactDOM.findDOMNode(this.refs.messageBox);
    let message = messageBox.value;
    if (message && message.length > 0){
      this.props.onSendMessage(message);
      messageBox.value = '';
    }
  }

  render(){
    return (
      <div className="row message-form">
        <form role="form" onSubmit={this.onSendMessage}>
            <div className="col-md-10">
              <textarea name="message" ref="messageBox"></textarea>
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary">Send</button>
            </div>
        </form>
      </div>
    );
  }
}

export default MessageForm;
