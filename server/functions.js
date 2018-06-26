'use strict';

function getRateByPriority(data, pib, priority) {
    let res = 0;
    for (let key in data) {
        if (data[key].pib == pib) return res + 1;
        if (parseInt(data[key].priority) <= priority)res++;
    }
    return 'There no such a man in this list';
}

module.exports = {
    getRateByPriority
};
