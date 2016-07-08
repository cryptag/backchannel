import { reqPost } from '../api';

export function getMessagesForRoom(roomKey){

  let plaintags = ['type:chatmessage', 'parentrow:' + roomKey];
  return reqPost('/rows/get', plaintags);



  // let that = this;
  //
  // // Only populate rooms the caller wants populated. If no rooms
  // // specified, populate all
  // let rooms = this.state.chat.rooms.filter(
  //     r => (roomIDs.length === 0 || roomIDs.contains(r.key))
  // )
  //
  // rooms.map(room => {
  //   let plaintags = ['type:chatmessage', 'parentrow:'+room.key];
  //
  //   // Fetch messages and attach them to room
  //
  //   return that.reqPost('/rows/get', plaintags)
  //     .then(res => {
  //       console.log('Processing ' + res.body.length + ' messages...');
  //
  //       let messages = res.body.map(msgRow => {
  //         let messageObj = that.parseJSON(msgRow);
  //         return {
  //           key: that.tagByPrefix(msgRow.plaintags, 'id:'),
  //           msg: messageObj.msg,
  //           from: that.tagByPrefixStripped(msgRow.plaintags, 'from:'),
  //           to: that.tagByPrefixStripped(msgRow.plaintags, 'to:'),
  //           tags: msgRow.plaintags
  //         }
  //       })
  //
  //       // Attach messages to existing room
  //       room.messages = messages.sort(that.sortRowByCreated.bind(that));
  //     }, (respErr) => {
  //       console.log(`Error fetching messages for room ${room.roomname}` +
  //                   ` with key ${room.key}: ${respErr}`);
  //     })
  // })
}
