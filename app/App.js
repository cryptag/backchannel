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
      username: 'jim',
      messages: [],
      isLoadingMessages: true
    };

    // ChatRoom
    this.loadChatroom = this.loadChatroom.bind(this);
    this.onSendMessage = this.onSendMessage.bind(this);
    this.populateMessages = this.populateMessages.bind(this);
  }

  componentDidMount(){
    this.loadChatRooms();
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
    }, (respErr) => {
      console.log("Error loading chat rooms: " + respErr);
    });
  }

  loadChatroom(roomKey){
    this.setState({
      currentRoomKey: roomKey
    });
    this.loadChatMessages(roomKey);
    this.pollForMessages();
  }

  pollForMessages(){
    setInterval(() => {
      this.loadChatMessages(this.state.currentRoomKey);
    }, 1000)
  }

  loadChatMessages(roomKey){
    getMessagesForRoom(roomKey)
      .then(this.populateMessages, (respErr) => {
        console.log("Error getting messages for room: " + respErr);
      });
  }

  populateMessages(response){
    let messages = formatMessages(response.body);
    this.setState({
      messages: messages,
      isLoadingMessages: false
    });
  }

  onSendMessage(message){
    this.setState({
      isLoadingMessages: true
    });

    let { currentRoomKey, username } = this.state;
    createMessage(currentRoomKey, message, username)
      .then((response) => {
        this.loadChatMessages(currentRoomKey);
      }, (respErr) => {
        console.log("Error creating message: " + respErr);
      });
  }

  render(){
    return (
      <main>
        <Nav />
        <ChatRoomList
          rooms={this.state.chatRooms}
          myUsername={this.state.username}
          onSelectRoom={this.loadChatroom} />

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
