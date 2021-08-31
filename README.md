# Idpay payment gateway 


You can use this library in your program and send your requests to the portal quickly

## Install 

```bash
npm install idpy
```

## Config

```js
const Idpy = require("idpy")
const payment = new Idpy();
```

## Create a transaction

```js
payment.createTransaction(
    'X-API-KEY',
  X-SANDBOX,
 order_id,
  amount,
  name,
  phone,
  email,
  desc,
  callback
);
 ```


 name|type|req|description|
 -----|-----|-----|---|
 x-api-key|string|true|x-api-key|
 X-sandbox|int|true|0 or 1|
 order_id|string|true|" 111"|
 amount|string|true|"10000"|
 name|string|false|"آرش موسوی"|
 phone|string|false|"09015207562"|
 email|string|false|"mr.arashmousavi@yahoo.com "|
 desc|string|false|"این درگاه idpy میباشد "|
 callback|string|true|"idpy.ir"|




### Response 

The time of sending the above information to the following information portal is received


```json
{
  "id": "d2e353189823079e1e4181772cff5292",
  "link": "https://idpay.ir/p/ws-sandbox/d2e353189823079e1e4181772cff5292"
}
```


 name|type|description|
 -----|-----|-----|
 id|string|id unique|
 link|string|Portal link|
 

In case of error, the answer is as follows

```json

{
  "error_code": 32,
  "error_message": "شماره سفارش `order_id` نباید خالی باشد."
}
```


## Return to the acceptor site


After the payment is completed, if the payment is successful, the payer will be transferred to the address specified by the acceptor in the callback.

Also, the following parameters are sent to the callback address defined in the transaction creation stage according to the web service settings in the IDP dashboard under the method of return after payment in two ways: POST (Post form) or GET (Query String).


### Parameters submitted by POST method




parament|type|description
-----|-----|-----
status|number|status Transaction
track_id|number|idpy Id
id|string|id Unique
order_id|string|id order
amount|number|amount Transaction
cart_no|string|cart number from format 1234******123456
hashed_cart_no|string|cart number hash by format SHA-256
date|timestamp|time of transaction


### Parameters submitted by GET method


parament|type|description
-----|-----|-----
status|number|status Transaction
track_id|number|idpy Id
id|string|id Unique
order_id|string|id order


## Transaction confirmation



After receiving the information on the acceptor's site and validating the information by the acceptor, the acceptor must confirm the transaction to complete the payment systematically and prevent the return of money to the payer.

```js
 payment.validTransaction(
     'X-API-KEY',
  X-SANDBOX ,
  id,
   order_id);

```
 name|type|req|description|
 -----|-----|-----|---|
 x-api-key|string|true|x-api-key|
 X-sandbox|int|true|0 or 1 for Send Sand Box|
 order_id|string|true|" 111"|
 id|string|true|Transaction Id|



### Response


```JSON
{
  "status": "100",
  "track_id": "10012",
  "id": "d2e353189823079e1e4181772cff5292",
  "order_id": "101",
  "amount": "10000",
  "date": "1546288200",
  "payment": {
    "track_id": "888001",
    "amount": "10000",
    "card_no": "123456******1234",
    "hashed_card_no": "E59FA6241C94B8836E3D03120DF33E80FD988888BBA0A122240C2E7D23B48295",
    "date": "1546288500"
  },
  "verify": {
    "date": "1546288800"
  }
}
```


### Confirmation error


parament|type|description
-----|-----|-----
status|number|status Transaction
track_id|number|idpy Id
id|string|id Unique
order_id|string|id order
payment|object|Transaction payment information
verify|object|Transaction verify information




```JSON
{
  "error_code": 32,
  "error_message": "شماره سفارش `order_id` نباید خالی باشد."
}
```

### tip

- After payment of the transaction by the payer, the transaction must be confirmed within a maximum of 10 minutes. Otherwise the amount will be returned to the payer's card.

To prevent a double spending, the acceptor is required to store the unique keys it receives via the IDP API (such as id and track_id) in its database and ensure that they are unique.
Note that a customer may save the IDP payment receipt and use it for another purchase.
Double Spending is fully responsible for reviewing and identifying Double Spending.

## Inquiry about transaction status

Using the following address, you can get the latest status of a transaction.

```JS
 payment
      .transactionInquiry(
         'X-API-KEY',
  X-SANDBOX ,
  id,
   order_id
      );
```

### Response



parament|type|description
-----|-----|-----
status|number|status Transaction
track_id|number|idpy Id
id|string|id Unique
order_id|string|id order
wage|object|Transaction fee information
date|timestamp|Transaction creation time
payer|object|Transaction payer information
payment|object|Transaction payment information
verify|object|Transaction verify information
settlement|object|Transaction deposit information

```JSON

{
  "status": "100",
  "track_id": "10012",
  "id": "d2e353189823079e1e4181772cff5292",
  "order_id": "101",
  "amount": "10000",
  "wage": {
    "by": "payee",
    "type": "percent",
    "amount": "2500"
  },
  "date": "1546288200",
  "payer": {
    "name": "قاسم رادمان",
    "phone": "09382198592",
    "mail": "my@site.com",
    "desc": "توضیحات پرداخت کننده"
  },
  "payment": {
    "track_id": "888001",
    "amount": "10000",
    "card_no": "123456******1234",
    "hashed_card_no": "E59FA6241C94B8836E3D03120DF33E80FD988888BBA0A122240C2E7D23B48295",
    "date": "1546288500"
  },
  "verify": {
    "date": "1546288800"
  },
  "settlement": {
    "track_id": "12345678900",
    "amount": "7500",
    "date": "1546398000"
  }
}

```


## Contacts

email : mr.arashmousavi@yahoo.com

site : [arashmousavi.ir](https://arashmousavi.ir)

instagram : [mr.arashmousavi](https://www.instagram.com/mr.arashmousavi/)
