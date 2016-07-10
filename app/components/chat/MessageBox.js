import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import MessageList from './MessageList';

import Throbber from '../general/Throbber';

class MessageBox extends Component {
  componentDidUpdate(prevProps){
    if (prevProps.messages.length !== this.props.messages.length){
      this.scrollToBottom();
    }

  }

  scrollToBottom(){
    let messageContainer = ReactDOM.findDOMNode(this.refs.messages);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }

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
      <div className="row message-box" ref="messages">
        <div className="col-md-12">
          {content}
        </div>
      </div>
    )
  }
}

export default MessageBox;
