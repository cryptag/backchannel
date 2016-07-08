import { reqPost } from '../api';
import { encodeObjForPost } from '../../utils/tags';


export function getMessagesForRoom(roomKey){

  let plaintags = ['type:chatmessage', 'parentrow:' + roomKey];
  return reqPost('/rows/get', plaintags);
}

export function createMessage(roomKey, msg, username){
  let row = {
    unencrypted: encodeObjForPost({msg: msg}),
    plaintags: ['parentrow:'+roomKey, 'from:'+username,
                'type:chatmessage', 'app:backchannel']
  }
  return reqPost('/rows', row);
}
