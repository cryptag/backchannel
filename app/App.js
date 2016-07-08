import React, { Component } from 'react';

import Nav from './components/layout/Nav';
import ChannelSummary from './components/layout/ChannelSummary';
import ChatRoomList from './components/chat/ChatRoomList';
import MessageBox from './components/chat/MessageBox';

import { getChatRooms } from './data/chat/rooms';
import { getMessagesForRoom, createMessage } from './data/chat/messages';

import { formatChatRooms, formatMessages } from './utils/chat';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      // Search
      searchValue: '',
      flashMessage: '',
      results: [],

      // Save task
      // title: '',
      // description: '',
      // assignees: '',
      // tags: '',
      // saveTaskFormMessage: '',

      // Chat
      chatRooms: [],
      username: 'steve',
      messages: [],
      chatFlashMessage: ''
    };

    // this.onChange = this.onChange.bind(this);

    // Search form
    // this.executeSearch = this.executeSearch.bind(this);

    // Save form
    // this.saveTask = this.saveTask.bind(this);

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

  // onChange(e){
  //   var that = this;
  //
  //   // This indirection is required because the forms call
  //   // `this.onChange().change.bind(this, 'some-form-field-name')` as
  //   // to pass in the first argument to the `change` function below.
  //   //
  //   // If forms simply call `this.onChange.bind(this, 'some-form-field-name')`
  //   // then we can't call `this.mergeState(...)` below, because `this`
  //   // would then refer to the form thanks to the form's calling of
  //   // the `bind` method.
  //
  //   return {
  //     change: (field, e) => {
  //       var update = {};
  //       update[field] = e.target.value
  //       that.mergeState(update)
  //     }
  //   }
  // }

  // executeSearch(e){
  //   e.preventDefault();
  //
  //   let plaintags = this.cleanedFields(this.state.searchValue)
  //
  //   // Only fetch Tasks (not text, files, nor anything else)
  //   plaintags.push('type:task');
  //
  //   let that = this;
  //
  //   this.reqPost('/rows/get', plaintags)
  //     .then(res => {
  //       results = res.body.map(row => {
  //         let task = that.parseJSON(row.unencrypted);
  //         return {
  //           key: that.tagByPrefix(row.plaintags, 'id:'),
  //           title: task.Title,
  //           description: task.Description,
  //           assignees: that.tagsByPrefixStripped(row.plaintags, 'assignee:'),
  //           tags: row.plaintags
  //         };
  //       });
  //
  //       that.setState({
  //         results: results,
  //         flashMessage: ''
  //       });
  //     }, (respErr) => {
  //       that.mergeState({
  //         results: [],
  //         flashMessage: respErr
  //       });
  //     })
  // }

  // saveTask(e){
  //   e.preventDefault();
  //
  //   let title = this.state.title.trim();
  //   if (!title) {
  //     this.mergeState({saveTaskFormMessage: 'Error: title cannot be empty'});
  //     return
  //   }
  //
  //   // TODO: Clarify to user that tags should be
  //   // space-separated. Later, make them comma-separated and split on
  //   // /,\s+/
  //   let plaintags = this.cleanedFields(this.state.tags);
  //
  //   let assignees = this.cleanedFields(this.state.assignees);
  //   plaintags = plaintags.concat(
  //     assignees.map(a => 'assignee:'+a)
  //   );
  //
  //   // Add tags users should't have to worry about
  //   plaintags = plaintags.concat(['type:task', 'app:cryptask']);
  //
  //   let task = {
  //     Title: title,
  //     Description: this.state.description
  //   }
  //
  //   let row = {
  //     unencrypted: this.encodeObjForPost(task),
  //     plaintags: plaintags
  //   }
  //
  //   this.reqPost('/row', row)
  //     .then(res => {
  //       let tags = res.body.plaintags;
  //       saveTaskFormMessage = 'New task saved with these tags: ' + tags.join(', ');
  //       this.mergeState({saveTaskFormMessage: saveTaskFormMessage});
  //     }, (respErr) => {
  //       this.mergeState({saveTaskFormMessage: respErr});
  //     })
  // }

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
            onLoadChatMessages={this.loadChatMessages}/>

          <div className="content">
            {/*TODO: only show ChatRoom if proper tab is selected*/}
            <MessageBox messages={this.state.messages} />
          </div>

          <ChannelSummary/>
      </main>
    );
  }
}
