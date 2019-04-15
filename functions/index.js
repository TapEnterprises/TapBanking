const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const plaid = require("plaid");
const cors = require("cors");
const util = require("util");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const PLAID_CLIENT_ID = "5c47bf3700f50200116f1b6d";
const PLAID_SECRET = "9b67c9692b9e4e71b2dcf86f326f65";
const PLAID_PUBLIC_KEY = "d6fed0482ed18248ae2e4380d924fd";
const PLAID_ENV = "sandbox";

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
app.use(cors());

app.post("/get_access_token", (request, response, next) => {
  const PUBLIC_TOKEN = request.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN, (error, tokenResponse) => {
    if (error !== null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    }
    return response.status(200).json({
      access_token: tokenResponse.access_token,
      item_id: tokenResponse.item_id,
      error: null
    });
  });
});

app.post("/transactions", (request, response, next) => {
  const startDate = request.body.startDate;
  const endDate = request.body.endDate;
  const count = request.body.count;
  const offset = request.body.offset;
  const ACCESS_TOKEN = request.body.access_token;
  client.getTransactions(
    ACCESS_TOKEN,
    startDate,
    endDate,
    {
      count: count ? count : 30,
      offset: offset ? offset : 0
    },
    (error, transactionsResponse) => {
      if (error !== null) {
        prettyPrintResponse(error);
        return response.json({
          error: error
        });
      } else {
        prettyPrintResponse(transactionsResponse);
        return response.status(200).json({
          error: null,
          transactions: transactionsResponse
        });
      }
    }
  );
});

app.post("/identity", (request, response, next) => {
  const ACCESS_TOKEN = request.body.access_token;
  client.getIdentity(ACCESS_TOKEN, (error, identityResponse) => {
    if (error !== null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    }
    prettyPrintResponse(identityResponse);
    return response.status(200).json({
      error: null,
      identity: identityResponse
    });
  });
});

app.post("/balance", (request, response, next) => {
  const ACCESS_TOKEN = request.body.access_token;
  client.getBalance(ACCESS_TOKEN, (error, balanceResponse) => {
    if (error !== null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    }
    prettyPrintResponse(balanceResponse);
    return response.status(200).json({
      error: null,
      balance: balanceResponse
    });
  });
});

app.post("/accounts", (request, response, next) => {
  const ACCESS_TOKEN = request.body.access_token;
  client.getAccounts(ACCESS_TOKEN, (error, accountsResponse) => {
    if (error !== null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    }
    prettyPrintResponse(accountsResponse);
    return response.status(200).json({
      error: null,
      accounts: accountsResponse
    });
  });
});

app.post("/auth", (request, response, next) => {
  const ACCESS_TOKEN = request.body.access_token;
  client.getAuth(ACCESS_TOKEN, (error, authResponse) => {
    if (error !== null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    }
    prettyPrintResponse(authResponse);
    return response.status(200).json({
      error: null,
      auth: authResponse
    });
  });
});

app.post("/income", (request, response, next) => {
  const ACCESS_TOKEN = request.body.access_token;
  client.getIncome(ACCESS_TOKEN, (error, incomeResponse) => {
    if (error !== null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    }
    prettyPrintResponse(incomeResponse);
    return response.status(200).json({
      error: null,
      income: incomeResponse
    });
  });
});

const prettyPrintResponse = response => {
  console.log(
    util.inspect(response, {
      colors: true,
      depth: 4
    })
  );
};

exports.PlaidAPI = functions.https.onRequest(app);
