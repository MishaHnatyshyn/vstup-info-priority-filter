'use strict';
function getInfo(){

    document.getElementById('result').innerHTML='';
    document.getElementById('img').style.display = 'inline';

    const priority = document.getElementById('priority').value;
    const pib = document.getElementById('pib').value;
    const path = document.getElementById('path').value;

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            document.getElementById('img').style.display = 'none';

            document.getElementById('result').innerHTML = '<br><br><br><h1>'+'Your rate by '+priority+' priority is: '+ this.responseText +'</h1>';
        }};

    xhttp.open('GET', 'server.js?path='+ path + '&pib=' + pib + '&prior=' + priority, true);
    xhttp.send();



};

function checkPath(){
    let path = document.getElementById('path').value;
    document.getElementById('path').style.backgroundColor = !path.indexOf('http://vstup.info/')?' rgba(0, 212, 0, 0.63)' : 'rgba(211, 15, 0, 0.76)' ;
    if(path === '')document.getElementById('path').style.backgroundColor = 'white';
}