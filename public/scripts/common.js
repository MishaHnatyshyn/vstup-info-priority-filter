/* eslint-disable no-undef,no-unused-vars */
'use strict';

function getBlock(id) {
  return document.getElementById(id);
}

function getInfo() {
  getBlock('result').innerHTML = '';
  getBlock('img').style.display = 'inline';

  const priority = getBlock('priority').value;
  const pib = getBlock('pib').value;
  const path = getBlock('path').value;

  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      getBlock('img').style.display = 'none';
      const numToString = {
        '1': 'first',
        '2': 'first and second',
        '3': 'first, second and third'
      };
      const answer = this.responseText === '0' ? 'This person is not mentioned in the list' :
        'Your rate by the ' + numToString[priority] + ' priority is: ' + this.responseText;
      getBlock('result').innerHTML = '<br><br><br><h1>' + answer + '</h1>';
    }
  };

  xhttp.open('GET', 'server.js?path=' + path + '&pib=' + pib + '&prior=' + priority, true);
  xhttp.send();



}

function checkPath() {
  const path = getBlock('path').value;
  getBlock('path').style.backgroundColor = !path.indexOf('http://vstup.info/') ? ' rgba(0, 212, 0, 0.63)' : 'rgba(211, 15, 0, 0.76)';
  if (path === '')getBlock('path').style.backgroundColor = 'white';
}
