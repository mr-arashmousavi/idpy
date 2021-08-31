const Idpy = require('./index');

const test = new Idpy();

test
  .createTransaction(
    '644b34e2-b69e-48a0-b0d7-a86fa196c629',
    '1',
    '111',
    '10000',
    'artash',
    '00000',
    'ss@ss.com',
    'asdas',
    'google.com'
  )
  .then(function (response) {
    console.log(JSON.stringify(response));
  })
  .catch(function (error) {
    console.log(error);
  });

// test
//   .validTransaction(
//     '644b34e2-b69e-48a0-b0d7-a86fa196c629',
//     '1',
//     'cbd4c599f300bf449a7a33e55ac3a494',
//     '111'
//   )
//   .then(function (response) {
//     console.log(JSON.stringify(response.data.data));
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
