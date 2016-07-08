import { reqPost } from '../api';

export function getChatRooms(){
  return reqPost('/rows/list', ['type:chatroom']);
    //
    // .then(res => {
    //   let rooms = [];
    //
    //   res.body.map(row => {
    //     let room = {
    //       key: tagByPrefix(row.plaintags, 'id:'),
    //       roomname: tagByPrefixStripped(row.plaintags, 'name:'),
    //       tags: row.plaintags
    //     }
    //     rooms.push(room);
    //   })
    //
    //   that.state.chat.rooms = rooms;
    //
    //   that.mergeState({chatFlashMessage: 'Rooms created'});
    // }, (respErr) => {
    //   console.log("Fetching chat rooms and pushing them to state.chat.rooms failed: " + respErr);
    //   that.mergeState({chatFlashMessage: respErr});
    // })
}

export function createChatRoom(backend, roomname){
  let row = {
    unencrypted: null,
    plaintags: ['name:'+roomname, 'type:chatroom', 'app:backchannel']
  }
  return reqPost('/rows', row);
}
