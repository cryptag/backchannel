import React, { Component } from 'react';
import Message from './Message';

class MessageBox extends Component {
  render(){
    let messages = this.props.messages;
    let username = this.props.myUsername;
    return (
      <div className="message-box">
        <ul>
          {messages.map( (message) => {
            return <Message key={message.key} message={message} username={username} />
          } )}
        </ul>
      </div>
    )
  }
}

export default MessageBox;
