### [Color Scheme](https://color.adobe.com/create/color-wheel/?base=2&rule=Analogous&selected=0&name=My%20Color%20Theme&mode=rgb&rgbvalues=0.7376605804152007,0.31463336475735626,1,0.4347114956992402,0.2816101618322564,0.91,0.3104448648402848,0.3969059218085319,1,0.2370048270046591,0.563989852135519,0.91,0.2751764203359873,0.8886264713676254,1&swatchOrder=0,1,2,3,4)

### [Hosted](https://tapbanking.firebaseapp.com/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm test`


### `npm run build`



## `Available Endpoints`

This API has multiple endpoints

### `/get_access_token`

**Required**

> {"public_token" : "example_public_token"}

#### Response
<details><summary>Expand</summary>
 <p>
   
   ```JSON
   {
      "access_token": "example_access_token",
      "item_id": "example_item_id",
      "error": null
    }
```
   
 </p>
 </details>


### `/transactions`

**Required**

> {"startDate" : "YYYY-MM-DD",
> "endDate" : "YYYY-MM-DD",
> "access_token" : "example_access_token"}

**Optional**
> {"count" : number,
> "offset" : number}

#### Response
<details><summary>Expand</summary>
<p>

```Json
http code 200
{
 "accounts": [{object}],
 "transactions": [{
    "account_id": "vokyE5Rn6vHKqDLRXEn5fne7LwbKPLIXGK98d",
    "amount": 2307.21,
    "iso_currency_code": "USD",
    "unofficial_currency_code": null,
    "category": [
      "Shops",
      "Computers and Electronics"
    ],
    "category_id": "19013000",
    "date": "2017-01-29",
    "location": {
     "address": "300 Post St",
     "city": "San Francisco",
     "state": "CA",
     "zip": "94108",
     "lat": null,
     "lon": null
    },
    "name": "Apple Store",
    "payment_meta": Object,
    "pending": false,
    "pending_transaction_id": null,
    "account_owner": null,
    "transaction_id": "lPNjeW1nR6CDn5okmGQ6hEpMo4lLNoSrzqDje",
    "transaction_type": "place"
   }, {
    "account_id": "XA96y1wW3xS7wKyEdbRzFkpZov6x1ohxMXwep",
    "amount": 78.5,
    "iso_currency_code": "USD",
    "unofficial_currency_code": null,
    "category": [
      "Food and Drink",
      "Restaurants"
    ],
    "category_id": "13005000",
    "date": "2017-01-29",
    "location": {
      "address": "262 W 15th St",
      "city": "New York",
      "state": "NY",
      "zip": "10011",
      "lat": 40.740352,
      "lon": -74.001761
    },
    "name": "Golden Crepes",
    "payment_meta": Object,
    "pending": false,
    "pending_transaction_id": null,
    "account_owner": null,
    "transaction_id": "4WPD9vV5A1cogJwyQ5kVFB3vPEmpXPS3qvjXQ",
    "transaction_type": "place"
  }],
  "item": {Object},
  "total_transactions": Number,
  "request_id": "45QSn"
}
 ```

</p>
</details>

### `/identity`

**Required**

> {"access_token": "example_access_token"}

#### Response
<details><summary>Expand</summary>
<p>

```JSON
http code 200
{
  "accounts": [{object}],
  "identity": {
    "addresses": [
      {
        "accounts": [
          "Plaid Checking 0000",
          "Plaid Saving 1111",
          "Plaid CD 2222"
        ],
        "data": {
          "city": "Malakoff",
          "state": "NY",
          "street": "2992 Cameron Road",
          "zip": "14236"
        },
        "primary": true
      },
      {
        "accounts": [
          "Plaid Credit Card 3333"
        ],
        "data": {
          "city": "San Matias",
          "state": "CA",
          "street": "2493 Leisure Lane",
          "zip": "93405-2255"
        },
        "primary": false
      }
    ],
    "emails": [
      {
        "data": "accountholder0@example.com",
        "primary": true,
        "type": "primary"
      }
    ],
    "names": [
      "Alberta Bobbeth Charleson"
    ],
    "phone_numbers": [{
      "primary": true,
      "type": "home",
      "data": "4673956022"
    }],
  },
  "item": {object},
  "request_id": "m8MDnv9okwxFNBV"
}
```

</p>
</details>



### `/balance`

#### Required

> {"access_token": "example_access_token"}

#### Response
<details><summary>Expand</summary>
<p>


```JSON
http code 200
{
  "accounts": [{
     "account_id": "QKKzevvp33HxPWpoqn6rI13BxW4awNSjnw4xv",
     "balances": {
       "available": 100,
       "current": 110,
       "limit": null,
       "iso_currency_code": "USD",
       "unofficial_currency_code": null
     },
     "mask": "0000",
     "name": "Plaid Checking",
     "official_name": "Plaid Gold Checking",
     "subtype": "checking",
     "type": "depository"
  }],
  "item": {object},
  "request_id": "m8MDnv9okwxFNBV"
}
```

</p>
</details>



### `/accounts`

**Required**

> {"access_token": "example_access_token"}

#### Response
<details><summary>Expand</summary>
<p>
  
```JSON
http code 200
{
  "accounts": [{
     "account_id": "QKKzevvp33HxPWpoqn6rI13BxW4awNSjnw4xv",
     "balances": {
       "available": 100,
       "current": 110,
       "limit": null,
       "iso_currency_code": "USD",
       "unofficial_currency_code": null
     },
     "mask": "0000",
     "name": "Plaid Checking",
     "official_name": "Plaid Gold Checking",
     "subtype": "checking",
     "type": "depository"
  }],
  "item": {object},
  "request_id": "m8MDnv9okwxFNBV"
}
```

</p>
</details>



### `/auth`

**Required**

> {"access_token": "example_access_token"}

#### Response
<details><summary>Expand</summary>
<p>

```JSON
http code 200
{
  "accounts": [{
    "account_id": "vzeNDwK7KQIm4yEog683uElbp9GRLEFXGK98D",
    "balances": {
      "available": 100,
      "current": 110,
      "limit": null,
      "iso_currency_code": "USD",
      "unofficial_currency_code": null,
    },
    "mask": "0000",
    "name": "Plaid Checking",
    "official_name": "Plaid Gold Checking",
    "subtype": "checking",
    "type": "depository"
  }],
  "numbers": {
     "ach": [{
      "account": "9900009606",
      "account_id": "vzeNDwK7KQIm4yEog683uElbp9GRLEFXGK98D",
      "routing": "011401533",
      "wire_routing": "021000021"
     }],
     "eft": []
  },
  "item": {Object},
  "request_id": "m8MDnv9okwxFNBV"
}
```

</p>
</details>



### `/income`

**Required**

> {"access_token": "example_access_token"}

#### Response
<details><summary>Expand</summary>
<p>

```JSON
http code 200
{
  "item": {Object},
  "income": {
    "income_streams": [
      {
        "confidence": 1,
        "days": 518,
        "monthly_income": 1601,
        "name": "PLAID"
      },
      {
        "confidence": 0.95,
        "days": 415,
        "monthly_income": 1530,
        "name": "BAGUETTES INC"
      }
    ],
    "last_year_income": 28072,
    "last_year_income_before_tax": 38681,
    "projected_yearly_income": 19444,
    "projected_yearly_income_before_tax": 26291,
    "max_number_of_overlapping_income_streams": 2,
    "number_of_income_streams": 2
  },
  "request_id": "m8MDnv9okwxFNBV"
}
```

</p>
</details>
