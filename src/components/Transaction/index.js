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
  Chip,
  ListSubheader
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

  insert = (string, insertion, index) => {
    if (index > 0)
      return (
        string.substring(0, index) +
        insertion +
        string.substring(index, string.length)
      );

    return insertion + string;
  };

  numberWithCommas = x => {
    var numberWithCommas = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var indexOfMinus = numberWithCommas.indexOf("-");

    return this.insert(numberWithCommas, " $", indexOfMinus + 1);
  };

  render() {
    return (
      <div>
        <Grid>
          {this.state.transactionsData ? (
            <List>
              {this.state.transactionsData.transactions.map(
                (transaction, index, transactions) => (
                  <div key={transaction.transaction_id}>
                    {(index === 0 ||
                      transaction.date !== transactions[index - 1].date) && (
                      <ListSubheader>{transaction.date}</ListSubheader>
                    )}
                    <ListItem>
                      <ExpansionPanel style={{ flex: 1 }}>
                        <ExpansionPanelSummary
                          style={{ padding: "0 0 0 15px" }}
                        >
                          <Typography variant="overline" style={{ flex: 1 }}>
                            {transaction.name}
                          </Typography>

                          <Typography
                            variant="subheading"
                            style={{
                              color: transaction.amount > 0 ? "red" : "green"
                            }}
                          >
                            {`${this.numberWithCommas(
                              (-transaction.amount).toFixed(2)
                            )}`}
                          </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <Grid container direction={"column"}>
                            <Grid item container>
                              <Grid item>
                                <ListItemText
                                  primary="Currency"
                                  secondary={transaction.iso_currency_code}
                                />
                              </Grid>
                              <Grid item>
                                <ListItemText
                                  primary="Status"
                                  secondary={
                                    transaction.pending
                                      ? "Pending"
                                      : "Completed"
                                  }
                                />
                              </Grid>
                            </Grid>
                            <Grid item container style={{ paddingTop: 5 }}>
                              {transaction.category.map(item => (
                                <Grid
                                  item
                                  style={{ paddingRight: 3 }}
                                  key={item.index + item}
                                >
                                  <Chip label={item} />
                                </Grid>
                              ))}
                            </Grid>
                          </Grid>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    </ListItem>
                  </div>
                )
              )}
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
