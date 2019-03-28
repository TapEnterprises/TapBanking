import React, { Component } from "react";
import { Link } from "react-router-dom";
import PlaidLink from "react-plaid-link";
import axios from "axios";
import db from "../../configs/firebase";
import firebase from "firebase";
import "./style.css";
import {
  Card,
  CardContent,
  Grid,
  CardActions,
  Avatar
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

class Plaid extends Component {
  constructor(props) {
    super(props);
    this.handleOnSuccess = this.handleOnSuccess.bind(this);
    const user = firebase.auth().currentUser;
    this.state = {
      access_token: null,
      uid: user.uid
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
          access_token: res.data.access_token
        }));
      })
      .then(() => {
        const docRef = db.collection("users").doc(this.state.uid);
        docRef
          .get()
          .then(doc => {
            if (doc.exists) {
              docRef.update({
                access_token: this.state.access_token
              });
            } else {
              docRef.set({
                access_token: this.state.access_token
              });
            }
          })
          .then(() => {
            this.props.history.push("/");
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "space-between"
            }}
          >
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
            <div
              style={{
                position: "absolute",
                bottom: "10vh",
                textAlign: "center",
                width: "31vw"
              }}
            >
              <Link to="/">
                <div style={{ color: "#ffffff" }}>Skip</div>
              </Link>
            </div>
          </div>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Plaid);
