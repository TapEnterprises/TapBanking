import React, { Component } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Grid,
  CircularProgress,
  Chip,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from "@material-ui/core";
import "./style.css";
import { MdExpandMore } from "react-icons/md";
import axois from "axios";
import firebase from "firebase";
import db from "../Configs/firebase";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      identity: null
    };
  }

  componentDidMount = () => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const docRef = db.collection("users").doc(uid);

    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data();
          if (data.access_token) {
            this.setState(() => ({ access_token: data.access_token }));
          } else {
            toast(
              <div style={{ color: "black" }} onClick={this.redirect}>
                You have not logged in with your bank. <br />{" "}
                <strong>
                  Click to add{" "}
                  <span role="img" aria-label="bank">
                    🏦
                  </span>
                </strong>
              </div>,
              {
                toastId: "mainToast",
                position: "bottom-center",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
              }
            );
          }
        }
      })
      .then(() => {
        axois
          .post(
            "https://us-central1-tapbanking.cloudfunctions.net/PlaidAPI/identity",
            {
              access_token: this.state.access_token
            }
          )
          .then(res => {
            this.setState(() => ({ identity: res.data.identity }));
          })
          .catch(err => {
            console.log(err);
          });
      });
  };

  redirect = () => {
    this.props.history.push("/plaidlink");
  };

  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  render() {
    const user = this.props.user;

    return (
      <div>
        <Grid
          container
          spacing={16}
          direction="column"
          justify="space-evenly"
          alignItems="stretch"
        >
          <Grid item xs={12}>
            <Card>
              <CardContent style={{ textAlign: "center" }}>
                <Grid container justify="center" item xs={12}>
                  <Avatar
                    style={{ height: 100, width: 100, fontSize: 35 }}
                    className="accountAvatar"
                    src={user.photoURL}
                  >
                    {user.displayName.charAt(0)}
                  </Avatar>
                </Grid>
                <div className="account">
                  <p>
                    <strong>Name:</strong> {user.displayName}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Grid>
          {this.state.identity ? (
            this.state.identity.accounts.map(account => {
              return (
                <Grid key={account.account_id} item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="headline">{account.name}</Typography>

                      <Typography variant="caption">
                        {account.official_name}
                      </Typography>
                      <div
                        style={{
                          paddingTop: "25px",
                          display: "flex",
                          flexDirection: "column"
                        }}
                      >
                        <Chip
                          color="default"
                          label={
                            "Available: " +
                            (account.balances.available
                              ? `$${this.numberWithCommas(
                                  account.balances.available.toFixed(2)
                                )}`
                              : "$0.00")
                          }
                        />
                        <br />
                        <Chip
                          color="primary"
                          label={`Total: $${this.numberWithCommas(
                            account.balances.current.toFixed(2)
                          )}`}
                        />
                        <br />
                        <Chip
                          color="secondary"
                          label={account.subtype.toUpperCase()}
                        />
                      </div>
                    </CardContent>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
                        More Information
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <div>
                          <div style={{ fontWeight: "bold" }}>
                            Type of Account:
                          </div>{" "}
                          {account.type.toUpperCase()}
                        </div>
                        <br />
                        <div>
                          <div style={{ fontWeight: "bold" }}>
                            Currency Type:
                          </div>{" "}
                          {account.balances.iso_currency_code}
                        </div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <Grid style={{ textAlign: "center" }} item xs={12}>
              <CircularProgress />
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

export default withRouter(Account);
