import React, { Component } from 'react';

class ChatRoom extends Component {
  render(){
    let myUsername = this.props.myUsername;
    let room = this.props.room;

    return (
     <div className="chatroom">
        {(room.messages || []).map(message => {
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