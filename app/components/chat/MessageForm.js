import React, { Component } from 'react';

class MessageForm extends Component {
  render(){
    return (
      <form role="form" onSubmit={this.props.onSendMessage}>
      <div className="row message-form">
          <div className="col-md-10">
            <textarea name="message" ref="messageBox"></textarea>
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary">Send</button>
          </div>
      </div>
    </form>
    )
  }
}

export default MessageForm;
