import React, { Component } from 'react';

import MessageBox from './MessageBox';
import MessageForm from './MessageForm';

class ChatContainer extends Component {
  render(){
    return (
      <div>
        <MessageBox messages={this.props.messages} myUsername={this.props.myUsername} />
        <MessageForm />
      </div>
    );
  }
}

export default ChatContainer;
