import React, { Component } from 'react';

import Message from './Message';

class MessageList extends Component {
  render(){
    let messages = this.props.messages;
    let username = this.props.username;

    return (
      <ul>
        {messages.length === 0 && <div>No messages here. Maybe you should send one?</div>}

        {messages.map( (message) => {
          return <Message key={message.key} message={message} username={username} />
        } )}
      </ul>
    );
  }
}

export default MessageList;
