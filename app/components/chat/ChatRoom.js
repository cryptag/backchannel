import React, { Component } from 'react';

class ChatRoom extends Component {
  onSelectRoom(){
    let roomKey = this.props.chatRoom.key;
    this.props.onSelectRoom(roomKey);
  }

  render(){
    let chatRoom = this.props.chatRoom;
    return (
      <li>
        <a href="#" onClick={this.onSelectRoom.bind(this)}>{chatRoom.roomname}</a>
      </li>
    )
  }
}

export default ChatRoom;
