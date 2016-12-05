import React, { Component } from 'react';

class Message extends Component {
  constructor(props){
    super(props);

    this.onMessageDelete = this.onMessageDelete.bind(this);
  }

  onMessageDelete(e){
    let deleteLink = $(e.target).parent('a');
    let messageKey = deleteLink.data('message-key');
    if (confirm('delete this message?')){
      this.props.onMessageDelete(messageKey);
    } else {
      // no-op
    }
  }

  render(){
    let { message, username } = this.props;
    let fromMe = message.from === username;
    let messageClass = fromMe ? 'chat-outgoing' : 'chat-incoming'
    return (
      <li className={messageClass} key={message.key}>
        <a href="#" onClick={this.onMessageDelete} data-message-key={message.key} className="delete-message"><i className="fa fa-window-close"></i></a>
        <span className="username">{message.from}</span>
        {message.msg}
      </li>
    );
  }
}

export default Message;
