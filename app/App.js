import React, { Component } from 'react';

import Nav from './components/layout/Nav';
import ChannelSummary from './components/layout/ChannelSummary';
import ChatRoomList from './components/chat/ChatRoomList';
import ChatContainer from './components/chat/ChatContainer';

import { getChatRooms } from './data/chat/rooms';
import { getMessagesForRoom, createMessage } from './data/chat/messages';

import { formatChatRooms, formatMessages } from './utils/chat';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      // Chat
      chatRooms: [],
      username: 'steve',
      messages: []
    };

    // ChatRoom
    this.sendMessage = this.sendMessage.bind(this);
    this.loadChatMessages = this.loadChatMessages.bind(this);
  }

  componentDidMount(){
    this.loadChatRooms();
  }

  loadChatRooms(){
    getChatRooms().then( (response) => {
      let rooms = formatChatRooms(response.body);
      console.log("Rooms:", rooms);
      this.setState({
        chatRooms: rooms
      });
    });
  }

  loadMessagesForDefaultChatroom(){
    let rooms = this.state.chatRooms;
    if (rooms.length > 0){
      let defaultChatroom = this.state.chatrooms[0];
      this.loadChatMessages(defaultChatroom.key);
    }
  }

  loadChatMessages(roomKey){
    getMessagesForRoom(roomKey)
      .then((response) => {
        let messages = formatMessages(response.body);
        console.log("Messages:", messages);
        this.setState({
          messages: messages
        });
      });
  }

  mergeState(obj){
    this.setState(
      Object.assign(this.state, obj)
    )
  }

  sendMessage(roomKey, msg){
    let username = this.state.username;
    createMessage(roomKey, msg, username).then( (response) => {
      console.log(response);
    });
    // TODO: Should add message to local DOM, not just send it to
    // cryptagd
  }

  render(){
    return (
      <main>
          <Nav />
          <ChatRoomList
            rooms={this.state.chatRooms}
            myUsername={this.state.username}
            onLoadChatMessages={this.loadChatMessages} />

          <div className="content">
            {/*TODO: only show ChatRoom if proper tab is selected*/}
            <ChatContainer messages={this.state.messages} myUsername={this.state.username} />
          </div>

          <ChannelSummary/>
      </main>
    );
  }
}
