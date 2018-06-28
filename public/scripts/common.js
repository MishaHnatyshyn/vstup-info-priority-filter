/* eslint-disable no-undef,no-unused-vars */
'use strict';

const getBlock = id => document.getElementById(id);

function parse(file, pib) {
  const table = [];
  const result = {};
  const tableFields = ['number', 'pib', 'status', 'priority', 'kb', 'zno', 'kf', 'kw', 'docs'];
  let start = file.indexOf('<tbody>', file.indexOf('<table id="150'));
  let end = file.indexOf('</table>', start);
  file = file.substring(start, end);

  let pos = file.indexOf('<tr');
  let count = 0;

  while (pos !== -1) {
    pos = file.indexOf('<tr', pos + 1);
    count++;
  }

  end = 0;

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

function getRateByPriority(data, pib, priority) {
  let res = 0;
  for (const key in data) {
    if (data[key].pib === pib) return '' + ++res;
    if (parseInt(data[key].priority) <= priority)res++;
  }
  return '0';
}

function getInfo() {
  getBlock('result').innerHTML = '<img src="images/InternetSlowdown_Day.gif" id="img">';

  const priority = getBlock('priority').value;
  const pib = getBlock('pib').value;
  const path = getBlock('path').value;
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const info = parse(this.responseText, pib);
      const rate = getRateByPriority(info, pib, priority);
      getBlock('img').style.display = 'none';
      const numToString = {
        '1': 'first',
        '2': 'first and second',
        '3': 'first, second and third'
      };
      const answer = rate === '0' ? 'This person is not mentioned in the list' :
        'Your rate by the ' + numToString[priority] + ' priority is: ' + rate;
      getBlock('result').innerHTML = '<br><br><br><h1>' + answer + '</h1>';
    }
  };

  xhttp.open('GET', 'server?path=' + path + '&pib=' + pib + '&prior=' + priority, true);
  xhttp.send();
}

function checkPath() {
  const path = getBlock('path').value;
  const red = 'rgba(211, 15, 0, 0.76)';
  const green = ' rgba(0, 212, 0, 0.63)';
  getBlock('path').style.backgroundColor = path.indexOf('http://vstup.info/') ? red : green;
  if (path === '')getBlock('path').style.backgroundColor = 'white';
}
