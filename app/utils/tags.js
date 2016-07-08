const utf8 = require('utf8');
const atob = require('atob');

export function tagByPrefix(plaintags, prefix) {
  for (let i = 0; i < plaintags.length; i++) {
    if (plaintags[i].startsWith(prefix)) {
      return plaintags[i];
    }
  }
  return '';
}

export function tagByPrefixStripped(plaintags, prefix) {
  return tagByPrefix(plaintags, prefix).slice(prefix.length);
}

export function tagsByPrefixStripped(plaintags, prefix) {
  let stripped = [];
  for (let i = 0; i < plaintags.length; i++) {
    if (plaintags[i].startsWith(prefix)) {
      // Strip off prefix
      stripped.push(plaintags[i].slice(prefix.length));
    }
  }
  return stripped;
}

export function sortRowByCreated(row, nextRow){
  let rowTags = row.tags || row.plaintags;
  let rowDate = tagByPrefixStripped(rowTags, 'created:');

  let nextRowTags = nextRow.tags || nextRow.plaintags;
  let nextRowDate = tagByPrefixStripped(nextRowTags, 'created:');

  return rowDate - nextRowDate;
}

export function parseJSON(str){
  return JSON.parse(utf8.decode(atob(str.unencrypted)));
}

export function encodeObjForPost(obj){
  return btoa(utf8.encode(JSON.stringify(obj)));
}

export function cleanedFields(s){
  let fields = s.trim().replace(',', ' ').split(/\s+/g);
  return fields.filter(f => f !== '');
}
