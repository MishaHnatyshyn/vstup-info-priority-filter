/* eslint-disable no-undef,no-unused-vars,linebreak-style */
'use strict';

const getBlock = (id) => document.getElementById(id);

const getInfo = () => {

  const priority = getBlock('priority').value;
  const pib = getBlock('pib').value;
  const path = getBlock('path').value;

  if (pib === '' || path === '') {
    alert('Fields are empty');
    return;
  }
  if (path.indexOf('http://www.vstup.info/') === -1 && path.indexOf('https://vstup.osvita.ua') === -1) {
    alert('Invalid URL');
    return;
  }
  getBlock('result').innerHTML = '<img src="images/InternetSlowdown_Day.gif" id="img">';

  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      getBlock('img').style.display = 'none';
      const numToString = {
        '1': 'first',
        '2': 'first and second',
        '3': 'first, second and third'
      };
      const response = JSON.parse(this.responseText);
      const answer = response.error ?
        'Request error. Please, enter correct url and try again.' :
        response.result ? 'Your rate by the ' + numToString[priority] + ' priority is: ' + response.result :
          'This person is not mentioned in the list';
      getBlock('result').innerHTML = '<br><br><h1>' + answer + '</h1>';
    }
  };

  xhttp.open('GET', 'server?path=' + path + '&pib=' + pib + '&prior=' + priority, true);
  xhttp.send();
};

const instructionShow = () => {
  document.getElementById('instruction-banner').style.display = 'block';
  document.getElementById('footer').style.display = 'none';
};

const instructionHide = () => {
  document.getElementById('instruction-banner').style.display = 'none';
  document.getElementById('footer').style.display = 'block';
};
