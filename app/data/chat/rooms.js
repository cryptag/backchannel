import { reqPost } from '../api';

export function getChatRooms(){
  return reqPost('/rows/list', ['type:chatroom']);
}

export function createChatRoom(backend, roomname){
  let row = {
    unencrypted: null,
    plaintags: ['name:'+roomname, 'type:chatroom', 'app:backchannel']
  }
  return reqPost('/rows', row);
}
