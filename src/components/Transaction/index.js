import React, { Component } from "react";
import {
  Grid,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Chip
} from "@material-ui/core";
import "./style.css";
import axois from "axios";
import firebase from "firebase";
import db from "../Configs/firebase";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

class Transaction extends Component {
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
            "https://us-central1-tapbanking.cloudfunctions.net/PlaidAPI/transactions",
            {
              access_token: this.state.access_token,
              startDate: "2018-01-01",
              endDate: "2019-01-01"
            }
          )
          .then(res => {
            this.setState({ transactionsData: res.data.transactions });
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
    const y = Math.abs(x);
    return y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  PosnumberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  render() {
    console.log(this.state.transactionsData);
    return (
      <div>
        <Grid>
          {this.state.transactionsData ? (
            <List>
              {this.state.transactionsData.transactions.map(transaction => (
                <ExpansionPanel key={transaction.transaction_id}>
                  <ExpansionPanelSummary style={{ padding: "0 0 0 15px" }}>
                    <Typography variant="overline" style={{ flexBasis: "95%" }}>
                      {transaction.name}
                    </Typography>

                    {transaction.amount > 0 ? (
                      <Typography variant="subheading">
                        {transaction.amount
                          ? `-$${this.PosnumberWithCommas(
                              transaction.amount.toFixed(2)
                            )}`
                          : "$0.00"}
                      </Typography>
                    ) : (
                      <Typography
                        style={{ color: "green" }}
                        variant="subheading"
                      >
                        {transaction.amount
                          ? `+$${this.numberWithCommas(
                              transaction.amount.toFixed(2)
                            )}`
                          : "$0.00"}
                      </Typography>
                    )}
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="Date"
                          secondary={transaction.date}
                        />
                        <ListItemText
                          primary="Pending"
                          secondary={transaction.pending ? "Yes" : "No"}
                        />
                      </ListItem>
                      <ListItem>
                        {transaction.category.map(item => {
                          return <Chip key={item.index + item} label={item} />;
                        })}
                      </ListItem>
                    </List>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ))}
            </List>
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

export default withRouter(Transaction);
