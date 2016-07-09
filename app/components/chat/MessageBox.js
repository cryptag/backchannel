import React, { Component } from 'react';
import MessageList from './MessageList';

import Throbber from '../general/Throbber';

class MessageBox extends Component {
  render(){
    let messages = this.props.messages;
    let username = this.props.myUsername;
    let isLoadingMessages = this.props.isLoadingMessages;
    let content;
    if (isLoadingMessages){
      content = <Throbber />
    } else {
      content = <MessageList messages={messages} username={username} />
    }

    return (
      <div className="row message-box">
        <div className="col-md-12">
          {content}
        </div>
      </div>
    )
  }
}

export default MessageBox;
