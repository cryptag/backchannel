import React, { Component } from 'react';
import ChatRoom from './ChatRoom';

class ChatRoomList extends Component {
  render(){
    let rooms = this.props.rooms;
    console.log(rooms);
    return (
      <div>
        {rooms.map(room => {
          return <ChatRoom myUsername={this.props.myUsername} room={room} key={room.key} />
        })}
      </div>
    )
  }
}

export default ChatRoomList;
