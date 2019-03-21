import React, { Component } from "react";
import PlaidLink from "react-plaid-link";

class Plaid extends Component {
  handleOnSuccess(token, metadata) {
    fetch(
      "https://us-central1-tapbanking.cloudfunctions.net/PlaidAPI/get_access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(token)
      }
    )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleonExit() {
    //handle the case whn you user exits link
  }
  render() {
    return (
      <PlaidLink
        clientName="TapBanking"
        env="sandbox"
        product={["auth", "transactions"]}
        publicKey="d6fed0482ed18248ae2e4380d924fd"
        onExit={this.handleOnExit}
        onSuccess={this.handleOnSuccess}
      >
        Open Link and connect your bank!
      </PlaidLink>
    );
  }
}

export default Plaid;
