import React, { Component } from 'react';
import ResultList from './components/ResultList';
import SearchForm from './components/SearchForm';
import SaveTaskForm from './components/SaveTaskForm';

import Nav from './components/layout/Nav';
import BackChannelsList from './components/layout/BackChannelsList';
import ChannelSummary from './components/layout/ChannelSummary';
import ChatRoom from './components/layout/ChatRoom';

const request = require('superagent');
const utf8 = require('utf8');

const cryptagdPrefix = require('superagent-prefix')('http://localhost:7878/trusted');

export default class App extends Component {
  constructor(props){
    super(props);

    this.setAndPopulateChatRooms();

    this.state = {
      // Search
      searchValue: '',
      flashMessage: '',
      results: [],

      // Save task
      title: '',
      description: '',
      assignees: '',
      tags: '',
      saveTaskFormMessage: '',

      // Chat
      chatFlashMessage: '',
      chat: {
        myUsername: 'steve',
        roomList: [],
        rooms: []
      }
    };

    this.onChange = this.onChange.bind(this);

    // Search form
    this.executeSearch = this.executeSearch.bind(this);

    // Save form
    this.saveTask = this.saveTask.bind(this);

    // ChatRoom
    this.sendMessage = this.sendMessage.bind(this);
  }

  mergeState(obj){
    this.setState(
      Object.assign(this.state, obj)
    )
  }

  onChange(e){
    var that = this;

    // This indirection is required because the forms call
    // `this.onChange().change.bind(this, 'some-form-field-name')` as
    // to pass in the first argument to the `change` function below.
    //
    // If forms simply call `this.onChange.bind(this, 'some-form-field-name')`
    // then we can't call `this.mergeState(...)` below, because `this`
    // would then refer to the form thanks to the form's calling of
    // the `bind` method.

    return {
      change: (field, e) => {
        var update = {};
        update[field] = e.target.value
        that.mergeState(update)
      }
    }
  }

  tagByPrefix(plaintags, prefix) {
    for (let i = 0; i < plaintags.length; i++) {
      if (plaintags[i].startsWith(prefix)) {
        return plaintags[i];
      }
    }
    return '';
  }

  tagByPrefixStripped(plaintags, prefix) {
    return this.tagByPrefix(plaintags, prefix).slice(prefix.length);
  }

  tagsByPrefixStripped(plaintags, prefix) {
    let stripped = [];
    for (let i = 0; i < plaintags.length; i++) {
      if (plaintags[i].startsWith(prefix)) {
        // Strip off prefix
        stripped.push(plaintags[i].slice(prefix.length));
      }
    }
    return stripped;
  }

  sortRowByCreated(row, nextRow){
    let rowTags = row.tags || row.plaintags;
    let rowDate = that.tagByPrefixStripped(rowTags, 'created:');

    let nextRowTags = nextRow.tags || nextRow.plaintags;
    let nextRowDate = that.tagByPrefixStripped(nextRowTags, 'created:');

    return rowDate - nextRowDate;
  }

  parseJSON(str){
    return JSON.parse(utf8.decode(atob(str)));
  }

  encodeObjForPost(obj){
    return btoa(utf8.encode(JSON.stringify(obj)));
  }

  cleanedFields(s){
    let fields = s.trim().replace(',', ' ').split(/\s+/g);
    return fields.filter(f => f !== '');
  }

  reqPost(urlSuffix, data){
    return new Promise((resolve, reject) => {
      request
        .post(urlSuffix)
        .use(cryptagdPrefix)
        .send(data)
        .end((err, res) => {
          let respErr = '';

          if (err) {
            if (typeof res === 'undefined') {
              respErr = err.toString();
            } else {
              // cryptagd's error format: {"error": "..."}
              respErr = res.body.error;
            }

            reject(respErr);
          }

          resolve(res);
        });
    })
  }

  executeSearch(e){
    e.preventDefault();

    let plaintags = this.cleanedFields(this.state.searchValue)

    // Only fetch Tasks (not text, files, nor anything else)
    plaintags.push('type:task');

    let that = this;

    this.reqPost('/rows/get', plaintags)
      .then(res => {
        results = res.body.map(row => {
          let task = that.parseJSON(row.unencrypted);
          return {
            key: that.tagByPrefix(row.plaintags, 'id:'),
            title: task.Title,
            description: task.Description,
            assignees: that.tagsByPrefixStripped(row.plaintags, 'assignee:'),
            tags: row.plaintags
          };
        });

        that.setState({
          results: results,
          flashMessage: ''
        });
      }, (respErr) => {
        that.mergeState({
          results: [],
          flashMessage: respErr
        });
      })
  }

  saveTask(e){
    e.preventDefault();

    let title = this.state.title.trim();
    if (!title) {
      this.mergeState({saveTaskFormMessage: 'Error: title cannot be empty'});
      return
    }

    // TODO: Clarify to user that tags should be
    // space-separated. Later, make them comma-separated and split on
    // /,\s+/
    let plaintags = this.cleanedFields(this.state.tags);

    let assignees = this.cleanedFields(this.state.assignees);
    plaintags = plaintags.concat(
      assignees.map(a => 'assignee:'+a)
    );

    // Add tags users should't have to worry about
    plaintags = plaintags.concat(['type:task', 'app:cryptask']);

    let task = {
      Title: title,
      Description: this.state.description
    }

    let row = {
      unencrypted: this.encodeObjForPost(task),
      plaintags: plaintags
    }

    this.reqPost('/row', row)
      .then(res => {
        let tags = res.body.plaintags;
        saveTaskFormMessage = 'New task saved with these tags: ' + tags.join(', ');
        this.mergeState({saveTaskFormMessage: saveTaskFormMessage});
      }, (respErr) => {
        this.mergeState({saveTaskFormMessage: respErr});
      })
  }

  setEmptyChatRooms(){
    let that = this;

    return this.reqPost('/rows/list', ['type:chatroom'])
      .then(res => {
        let rooms = [];

        res.body.map(row => {
          let room = {
            key: that.tagByPrefix(row.plaintags, 'id:'),
            roomname: that.tagByPrefixStripped(row.plaintags, 'roomname:'),
            tags: row.plaintags
          }
          rooms.push(room);
        })

        that.state.chat.rooms = rooms;

        that.mergeState({chatFlashMessage: 'Rooms created'});
      }, (respErr) => {
        console.log("Fetching chat rooms and pushing them to state.chat.rooms failed: " + respErr);
        that.mergeState({chatFlashMessage: respErr});
      })
  }

  populateChatRooms(roomIDs = []){
    let that = this;

    // Only populate rooms the caller wants populated. If no rooms
    // specified, populate all
    let rooms = this.state.chat.rooms.filter(
        r => (roomIDs.length === 0 || roomIDs.contains(r.key))
    )

    rooms.map(room => {
      let plaintags = ['type:chatmessage', 'parentrow:'+room.key];

      // Fetch messages and attach them to room

      return that.reqPost('/rows/get', plaintags)
        .then(res => {
          console.log('Processing ' + res.body.length + ' messages...');

          let messages = res.body.map(msgRow => {
            let messageObj = that.parseJSON(msgRow);
            return {
              key: that.tagByPrefix(msgRow.plaintags, 'id:'),
              msg: messageObj.msg,
              from: that.tagByPrefixStripped(msgRow.plaintags, 'from:'),
              to: that.tagByPrefixStripped(msgRow.plaintags, 'to:'),
              tags: msgRow.plaintags
            }
          })

          // Attach messages to existing room
          room.messages = messages.sort(that.sortRowByCreated);
        }, (respErr) => {
          console.log(`Error fetching messages for room ${room.roomname}` +
                      ` with key ${room.key}: ${respErr}`);
        })
    })
  }

  setAndPopulateChatRooms(){
    let that = this;

    this.setEmptyChatRooms()
    .then(promise => {
      return promise
    }, (reason) => {
      console.log("setEmptyChatRooms() failed: " + reason);
    })
    .then(promise => {
      that.populateChatRooms()
    }, (reason) => {
      console.log("populateChatRooms() failed: " + reason);
    })
  }

  sendMessage(roomKey, msg){
    // TODO: Should add message to local DOM, not just send it to
    // cryptagd

    let row = {
      unencrypted: this.encodeObjForPost({msg: msg}),
      plaintags: ['parentrow:'+roomKey, 'from:'+this.myUsername,
                  'type:chatmessage', 'app:backchannel']
    }
    this.reqPost('/rows', row)
    .then(res => {
      this.mergeState({chatFlashMessage: 'Message sent'});
    }, (respErr) => {
      this.mergeState({chatFlashMessage: respErr})
    })
  }

  render(){
    return (
      <main>
          <Nav />
          <BackChannelsList />

            <div className="content">
              {/*TODO: only show ChatRoom if proper tab is selected*/}

              {this.state.chat.rooms.map(room => {
                return (
                  <div key={room.key}>
                    <ChatRoom
                      room={room}
                      myUsername={this.state.chat.myUsername}
                      chatFlashMessage={this.state.chatFlashMessage} />
                      {/* TODO: Create different chatFlashMessage per room */}

                  </div>
                )
              })}
            </div>

            <ChannelSummary/>

          {/*<SaveTaskForm
            saveTask={this.saveTask}
            onChangeSaveTitle={this.onChangeSaveTitle}
            onChangeSaveDescription={this.onChangeSaveDescription}
            onChangeSaveAssignees={this.onChangeSaveAssignees}
            onChangeSaveTags={this.onChangeSaveTags}
            saveTaskFormMessage={this.state.saveTaskFormMessage} />*/}

          {/*<SearchForm
            executeSearch={this.executeSearch}
            onChangeTagValue={this.onChangeTagValue}
            flashMessage={this.state.flashMessage} />*/}

        {/*<ResultList results={this.state.results} />*/}
      </main>
    );
  }
}
