import React, { Component } from "react";
import PlaidLink from "react-plaid-link";
import axios from "axios";
import db from "../Configuration/firebase";
import firebase from "firebase";
import "./plaidlinkStyle.css";
import Notification from "../Common/notification";
import {
  Card,
  CardContent,
  Grid,
  CardActions,
  Avatar,
  Button
} from "@material-ui/core";

class Plaid extends Component {
  constructor(props) {
    super(props);
    this.handleOnSuccess = this.handleOnSuccess.bind(this);
    const user = firebase.auth().currentUser;
    this.state = {
      access_token: null,
      uid: user.uid,
      metadata: null
    };
  }

  redirect = () => {
    this.props.history.push("/");
  };

  handleOnSuccess(token, metadata) {
    axios
      .post(
        "https://us-central1-tapbanking.cloudfunctions.net/PlaidAPI/get_access_token",
        { public_token: token }
      )
      .then(res => {
        this.setState(() => ({
          access_token: res.data.access_token,
          metadata
        }));
      })
      .then(() => {
        const docRef = db.collection("users").doc(this.state.uid);
        docRef
          .get()
          .then(doc => {
            if (doc.exists) {
              docRef.update({
                access_token: this.state.access_token,
                metadata: this.state.metadata
              });
            } else {
              docRef.set({
                access_token: this.state.access_token,
                metadata: this.state.metadata
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
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
      <div className="plaidLinkBackground">
        <Grid container justify="center">
          <Card>
            <CardContent>
              <Avatar
                src="https://img.icons8.com/nolan/100/000000/bank-building.png"
                style={{ height: "100px", width: "100px" }}
              />
            </CardContent>
            <CardActions>
              <PlaidLink
                clientName="TapBanking"
                env="sandbox"
                product={["auth", "transactions"]}
                publicKey="d6fed0482ed18248ae2e4380d924fd"
                onExit={this.handleOnExit}
                onSuccess={this.handleOnSuccess}
              >
                <p>Connect to Bank</p>
              </PlaidLink>
            </CardActions>
          </Card>
          <Notification
            message={"You have successfuly connected with your bank."}
            hide={600}
            open={this.state.access_token}
          >
            <Button onClick={this.redirect} color="secondary" size="small">
              Go to dashboard
            </Button>
          </Notification>
          ;
        </Grid>
      </div>
    );
  }
}

export default Plaid;
