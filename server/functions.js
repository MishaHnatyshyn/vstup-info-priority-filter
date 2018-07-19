'use strict';

function getRateByPriority(data, pib, priority) {
  let res = 0;
  for (const key in data) {
    if (data[key].pib === pib) return res + 1;
    if (parseInt(data[key].priority) <= priority && data[key].status.indexOf('Відмова') === -1)res++;
  }
  return null;
}

function log(path, pib, priority, result, error) {
  console.dir({
    path,
    pib,
    priority,
    result,
    error,
    date: new Date().toDateString(),
    time: new Date().toLocaleTimeString()
  });
}

module.exports = {
  getRateByPriority,
  log
};
