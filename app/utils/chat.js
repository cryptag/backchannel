import { tagByPrefix, tagByPrefixStripped, parseJSON, sortRowByCreated } from './tags';

export function formatChatRooms(rawRooms){
  return rawRooms.map(row => {
    return {
      key: tagByPrefix(row.plaintags, 'id:'),
      roomname: tagByPrefixStripped(row.plaintags, 'roomname:'),
      tags: row.plaintags
    }
  });
}

export function formatMessages(rawMessages){
  let messages = rawMessages.map(msgRow => {
    let messageObj = parseJSON(msgRow);
    return {
      key: tagByPrefix(msgRow.plaintags, 'id:'),
      msg: messageObj.msg,
      from: tagByPrefixStripped(msgRow.plaintags, 'from:'),
      to: tagByPrefixStripped(msgRow.plaintags, 'to:'),
      tags: msgRow.plaintags
    };
  });

  return messages.sort(sortRowByCreated);
}
