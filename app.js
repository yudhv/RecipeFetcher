// const fetch = require('node-fetch');

import num from './temp';
console.log(`Inside app.js with import ${num} from temp`);
// let resultA, resultB, resultC;

// function addAsync(num1, num2) {
//     // use ES6 fetch API, which return a promise
//     return fetch(`https://www.metaweather.com/api/location/44418/`)
//         .then(x => x.json());
// }

// addAsync(1, 2)
//     .then(success => {
//         resultA = success;
//         return resultA;
//     })
//     .then(success => addAsync(success, 3))
//     .then(success => {
//         resultB = success;
//         return resultB;
//     })
//     .then(success => addAsync(success, 4))
//     .then(success => {
//         resultC = success;
//         return resultC;
//     })
//     .then(success => {
//         console.log('total: ' + success)
//         console.log(resultA, resultB, resultC)
//     });