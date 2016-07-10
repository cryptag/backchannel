import React, { Component } from 'react';
import ChatRoom from './ChatRoom';

import SetUsernameModal from '../modals/SetUsername';

import { getChatRooms } from '../../data/chat/rooms';


class ChatRoomList extends Component {

  render(){
    let rooms = this.props.rooms;
    let allChannels = [
      {
        key: 'channel1',
        name: "Word Green Fund",
        chatRooms: rooms
      }
    ];

    return (
      <div className="channels">
        <div className="create">
          <i className="fa fa-plus-circle"></i>
        </div>
        <h2>All Backchannels</h2>

        <ul>
          {allChannels.map( (channel) => {
            return <li key={channel.key}>
              <i className="fa fa-globe"></i>
              <span className="name">{channel.name}</span>

              <ul className="chat">
                {channel.chatRooms.map( (chatRoom) => {
                  return <ChatRoom
                    key={chatRoom.key}
                    chatRoom={chatRoom}
                    onSelectRoom={this.props.onSelectRoom}/>
                })}
              </ul>
            </li>
          })}
        </ul>

        <div>
          <div className="username-greeting">Hello, {this.props.username}</div>

          <SetUsernameModal
            username={this.props.username}
            onUpdateUsername={this.props.onUpdateUsername} />
        </div>
      </div>
    );
  }
}

export default ChatRoomList;
