'use strict';

function getPibByNum(data,n) {
    return data[n-1].pib;
}

function getNumByPib(data,pib) {
    for (let key in data){
        if(data[key].pib == pib)return data[key].number;
    }
    return 'There no such a man in this list';
}

function getPeopleList(data) {
    let res = [];
    for (let key in data)res.push(data[key].pib);
    return res;
}

function getNumOfOnePriority(data, pib) {

    let res = 0;
    for (let key in data) {
        if (data[key].pib == pib) return res + 1;
        if (data[key].priority === '1') res++;
    }
    return 'There no such a man in this list';
}
function getNumOfTwoPriority(data, pib) {

    let res = 0;
    for (let key in data) {
        if (data[key].pib == pib) return res + 1;
        if (data[key].priority === '1'||data[key].priority === '2') res++;
    }
    return 'There no such a man in this list';
}
function getNumOfThreePriority(data, pib) {

    let res = 0;
    for (let key in data) {
        if (data[key].pib == pib) return res + 1;
        if (data[key].priority === '1'||data[key].priority === '2'||data[key].priority === '3' ) res++;
    }
    return 'There no such a man in this list';
}


module.exports = {
    getPibByNum,
    getNumByPib,
    getPeopleList,
    getNumOfOnePriority,
    getNumOfTwoPriority,
    getNumOfThreePriority
}
