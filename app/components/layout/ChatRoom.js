import React, { Component } from 'react';

class ChatRoom extends Component {
  render(){
    let myUsername = this.myUsername;
    return (
      <div className="chatroom">
        {messages.map(message => {
          let fromMe = (message.from === myUsername);
          return (
            <div key={message.key} className={fromMe ? 'chat-outgoing' : 'chat-incoming'}>
              {message.from}: {message.msg}
            </div>
          )
        })}
      </div>
    )
  }
}

export default ChatRoom;
