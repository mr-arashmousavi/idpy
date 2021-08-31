# درگاه پرداخت idpy

از این کتاب خانه میتوانید در برنامه خود استفاده کنید و به سرعت درخواست های خود را به درگاه ارسال کنید 

## نصب 

```bash
npm install idpy
```

## کانفیگ

```js
const Idpy = require("idpy")
const payment = new Idpy();
```


## ایجاد تراکنش 

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




### پاسخ 
زمان ارسال اطلاعات بالا به درگاه اطلاعات زیر دریافت میشود 



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
 



در صورت خطا پاسخ به این شکل میباشه
```json

{
  "error_code": 32,
  "error_message": "شماره سفارش `order_id` نباید خالی باشد."
}
```


## بازگشت به سایت پذیرنده

بعد از اتمام عملیات پرداخت، درصورتیکه پرداخت با موفقیت انجام شده باشد، پرداخت کننده به آدرسی که پذیرنده در callback مشخص کرده بود منتقل می‌شود.

همچنین پارامترهای زیر به آدرس callback تعریف شده در مرحله ایجاد تراکنش با توجه به تنظیمات وب سرویس در داشبورد آیدی پی تحت عنوان روش بازگشت پس از پرداخت به دو روش POST (Post form) یا GET (Query String) ارسال می شوند.





پارامترهای ارسالی با روش POST





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

پارامترهای ارسالی با روش GET



parament|type|description
-----|-----|-----
status|number|status Transaction
track_id|number|idpy Id
id|string|id Unique
order_id|string|id order



## تایید تراکنش



بعد از دریافت اطلاعات به سایت پذیرنده و اعتبار سنجی اطلاعات توسط پذیرنده، پذیرنده باید تراکنش را تایید کند تا پرداخت بصورت سیستمی تکمیل شود و از بازگشت پول به پرداخت کننده جلوگیری شود.


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



پاسخ


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



parament|type|description
-----|-----|-----
status|number|status Transaction
track_id|number|idpy Id
id|string|id Unique
order_id|string|id order
payment|object|Transaction payment information
verify|object|Transaction verify information


### خطا در تایید 

```JSON
{
  "error_code": 32,
  "error_message": "شماره سفارش `order_id` نباید خالی باشد."
}
```

نکته
- بعد از پرداخت تراکنش توسط پرداخت کننده، تراکنش باید ظرف مدت حداکثر 10 دقیقه تایید شود. در غیر اینصورت مبلغ به کارت پرداخت کننده برگردانده خواهد شد.

- هت جلوگیری از دوبار مصرف شدن یک پرداخت (Double Spending)، پذیرنده موظف است کلیدهای منحصر بفردی که از طریق API آیدی پی دریافت می‌کند را (مثل id و track_id) در دیتابیس خود ذخیره کند و از یکتا بودن آنها اطمینان حاصل فرماید.
توجه داشته باشید که ممکن است یک مشتری رسید پرداخت آیدی پی را ذخیره کند و برای یک خرید دیگر از آن استفاده کند.
مسئولیت بررسی و شناسایی Double Spending کاملا به عهده پذیرنده می‌باشد.




## استعلام وضعیت تراکنش

با استفاده از آدرس زیر می‌توانید آخرین وضعیت یک تراکنش را دریافت نمایید.

```JS
 payment
      .transactionInquiry(
         'X-API-KEY',
  X-SANDBOX ,
  id,
   order_id
      );
```

### پاسخ 



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


## اطلاعات تماس 
email : mr.arashmousavi@yahoo.com

tel : 0901520756

site : [arashmousavi.ir](https://arashmousavi.ir)

instagram : [mr.arashmousavi](https://www.instagram.com/mr.arashmousavi/)
