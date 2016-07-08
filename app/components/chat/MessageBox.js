import React, { Component } from 'react';

class MessageBox extends Component {
  render(){
    let messages = this.props.messages;
    return (
      <ul>
        {messages.map( (msg) => {
          return <li key={msg.key}>{msg.msg}</li>
        } )}
      </ul>
    )
  }
}

export default MessageBox;
