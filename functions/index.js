const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
const plaid = require("plaid");
const cors = require("cors");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const PLAID_CLIENT_ID = "5c47bf3700f50200116f1b6d";
const PLAID_SECRET = "9b67c9692b9e4e71b2dcf86f326f65";
const PLAID_PUBLIC_KEY = "d6fed0482ed18248ae2e4380d924fd";
const PLAID_PRODUCTS = "transactions";
const PLAID_ENV = "sandbox";

let ACCESS_TOKEN = null;
let PUBLIC_TOKEN = null;
let ITEM_ID = null;

const client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV],
  {
    version: "2018-05-22"
  }
);

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(
  cors({
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
  })
);

app.post("/get_access_token", (request, response, next) => {
  PUBLIC_TOKEN = request.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN, (error, tokenResponse) => {
    if (error !== null) {
      return response.json({
        error: error
      });
    }
    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
    response.json({
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID,
      error: null
    });
  });
});

app.get("/transactions", (request, response, next) => {
  const startDate = moment()
    .subtract(30, "days")
    .format("YYYY-MM-DD");
  const endDate = moment().format("YYYY-MM-DD");
  client.getTransactions(
    ACCESS_TOKEN,
    startDate,
    endDate,
    {
      count: 250,
      offset: 0
    },
    function(error, transactionsResponse) {
      if (error !== null) {
        return response.json({
          error: error
        });
      } else {
        response.json({
          error: null,
          transactions: transactionsResponse
        });
      }
    }
  );
});

app.get("/identity", (request, response, next) => {
  client.getIdentity(ACCESS_TOKEN, (error, identityResponse) => {
    if (error !== null) {
      return response.json({
        error: error
      });
    }
    response.json({
      error: null,
      identity: identityResponse
    });
  });
});

app.get("/balance", (request, response, next) => {
  client.getBalance(ACCESS_TOKEN, (error, balanceResponse) => {
    if (error !== null) {
      return response.json({
        error: error
      });
    }
    response.json({
      error: null,
      balance: balanceResponse
    });
  });
});

app.get("/accounts", (request, response, next) => {
  client.getAccounts(ACCESS_TOKEN, (error, accountsResponse) => {
    if (error !== null) {
      return response.json({
        error: error
      });
    }
    response.json({
      error: null,
      accounts: accountsResponse
    });
  });
});

app.get("/auth", (request, response, next) => {
  client.getAuth(ACCESS_TOKEN, (error, authResponse) => {
    if (error !== null) {
      return response.json({
        error: error
      });
    }
    response.json({
      error: null,
      auth: authResponse
    });
  });
});

app.get("/income", (request, response, next) => {
  client.getIncome(ACCESS_TOKEN, (error, incomeResponse) => {
    if (error !== null) {
      return response.json({
        error: error
      });
    }
    response.json({
      error: null,
      income: incomeResponse
    });
  });
});

exports.PlaidAPI = functions.https.onRequest(app);
