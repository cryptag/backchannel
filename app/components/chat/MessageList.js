import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import Message from './Message';

class MessageList extends Component {

  render(){
    let messages = this.props.messages;
    let username = this.props.username;

    return (
      <ul>
        {messages.map( (message) => {
          return <Message key={message.key} message={message} username={username} />
        } )}
      </ul>
    );
  }
}

export default MessageList;
