import React, { Component } from 'react';

class ChatRoom extends Component {
  constructor(props){
    super(props);

    this.state = {
      myUsername: 'steve',
      messages: [
          {key: 'msg1', msg: 'Hello there, Jim! What\'s up?', from: 'steve'},
          {key: 'msg2', msg: 'Hey Steve', from: 'jim'}
      ]
    };
  }

  render(){
    let messages = this.state.messages;
    return (
      <div className="chatroom">
        {messages.map((message) => {
          let fromMe = (message.from === this.state.myUsername);
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
