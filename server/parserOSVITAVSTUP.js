'use strict';
const table = [];
const result = {};
const tableFields = ['number', 'pib', 'status', 'priority', 'kb', 'zno', 'ko', 'kv', 'type', 'D'];

function parse(file, pib) {
  let start = file.indexOf('<table class="rwd-table">');
  let end = file.indexOf('</table>', start);
  file = file.substring(start, end).replace(/&nbsp;/g, ' ');
  let pos = file.indexOf('<tr');
  let count = -1;

  while (pos !== -1) {
    pos = file.indexOf('<tr', pos + 1);
    count++;
  }

  end = file.indexOf('</tr>', 0);

  for (let i = 0; i < count; i++) {
    start = file.indexOf('<tr', end);
    end = file.indexOf('</tr>', start);

    table[i] = file.substring(start, end);

  }
  let key;

  let str = '';
  for (let i = 0; i < count; i++) {
    end = 0;
    const obj = {};
    for (let j = 0; j < tableFields.length; j++) {
      key = tableFields[j];
      start = table[i].indexOf('<td', end);
      end = table[i].indexOf('</td>', start);
      str = table[i].substring(start, end);
      str = str.substring(str.indexOf('>') + 1);
      obj[key] = str;
    }
    result[i] = obj;
    if (obj.pib === pib) break;
  }
  return result;
}

module.exports.parse = parse;
