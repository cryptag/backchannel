import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Nav from './components/layout/Nav';
import ChannelSummary from './components/layout/ChannelSummary';
import ChatRoomList from './components/chat/ChatRoomList';
import ChatContainer from './components/chat/ChatContainer';

import { getChatRooms } from './data/chat/rooms';
import { getMessagesForRoom, createMessage } from './data/chat/messages';

import { formatChatRooms, formatMessages } from './utils/chat';
import { playNotification } from './utils/audio';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      // Chat
      chatRooms: [],
      username: 'jim',
      messages: [],
      isLoadingMessages: true
    };

    // ChatRoom
    this.loadChatroom = this.loadChatroom.bind(this);
    this.onSendMessage = this.onSendMessage.bind(this);
    this.onUpdateUsername = this.onUpdateUsername.bind(this);
  }

  componentDidMount(){
    this.loadChatRooms();
  }

  onUpdateUsername(username){
    this.setState({
      username: username
    });
  }

  loadChatRooms(){
    getChatRooms().then( (response) => {
      let rooms = formatChatRooms(response.body);
      this.setState({
        chatRooms: rooms
      });

      if (rooms.length > 0){
        let defaultChatroom = this.state.chatRooms[0];
        this.loadChatroom(defaultChatroom.key);
      }
    });
  }

  loadChatroom(roomKey){
    this.setState({
      currentRoomKey: roomKey
    });
    this.loadChatMessages(roomKey);
  }

  loadChatMessages(roomKey){
    // TODO: how better to handle the 'no messages' loading case?

    getMessagesForRoom(roomKey)
      .then((response) => {
        let messages = formatMessages(response.body);
        this.setState({
          messages: messages,
          isLoadingMessages: false
        });
      }, (error) => {
        this.setState({
          messages: [],
          isLoadingMessages: false
        });
      });
  }

  onSendMessage(message){
    this.setState({
      isLoadingMessages: true
    });

    playNotification();

    let { currentRoomKey, username } = this.state;
    createMessage(currentRoomKey, message, username)
      .then((response) => {
        this.loadChatMessages(currentRoomKey);
      });
  }

  render(){
    return (
      <main>
          <Nav />
          <ChatRoomList
            rooms={this.state.chatRooms}
            username={this.state.username}
            onSelectRoom={this.loadChatroom}
            onUpdateUsername={this.onUpdateUsername} />

          {/*TODO: only show ChatRoom if proper tab is selected*/}
          <ChatContainer
            messages={this.state.messages}
            myUsername={this.state.username}
            onSendMessage={this.onSendMessage}
            isLoadingMessages={this.state.isLoadingMessages} />

          <ChannelSummary/>
      </main>
    );
  }
}
