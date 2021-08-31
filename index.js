class Idpy {
  createTransaction(
    key,
    sandBox,
    order_id,
    amount,
    name,
    phony,
    mail,
    description,
    callBack
  ) {
    const request = require('request');
    const axios = require('axios');

    var options = {
      method: 'POST',
      url: 'https://api.idpay.ir/v1.1/payment',
      headers: {
        'X-API-KEY': key,
        'X-SANDBOX': sandBox,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_id: order_id,
        amount: amount,
        name: name,
        phony: phony,
        mail: mail,
        desc: description,
        callback: callBack
      })
    };

    var data = JSON.stringify({
      order_id: order_id,
      amount: amount,
      name: name,
      phony: phony,
      mail: mail,
      desc: description,
      callback: callBack
    });

    var config = {
      method: 'post',
      url: 'https://api.idpay.ir/v1.1/payment',
      headers: {
        'X-API-KEY': key,
        'X-SANDBOX': sandBox,
        'Content-Type': 'application/json'
      },
      data: data
    };
    return axios(config);
  }

  validTransaction(key, sandBox, id, order_id) {
    const axios = require('axios');
    var data = JSON.stringify({
      id: id,
      order_id: order_id
    });

    var config = {
      method: 'POST',
      url: 'https://api.idpay.ir/v1.1/payment/verify',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': key,
        'X-SANDBOX': sandBox
      },
      data: data
    };
    return axios(config);
  }

  transactionInquiry(key, sandBox, id, order_id) {
    const axios = require('axios');
    var data = JSON.stringify({
      id: id,
      order_id: order_id
    });

    var config = {
      method: 'POST',
      url: 'https://api.idpay.ir/v1.1/payment/inquiry',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': key,
        'X-SANDBOX': sandBox
      },
      data: data
    };
    return axios(config);
  }
}

module.exports = Idpy;
