'use strict';

function getRateByPriority(data, pib, priority) {
    let res = 0;
    for (let key in data) {
        if (data[key].pib == pib) return res + 1;
        if (parseInt(data[key].priority) <= priority)res++;
    }
    return 0;
}

module.exports = {
    getRateByPriority
};