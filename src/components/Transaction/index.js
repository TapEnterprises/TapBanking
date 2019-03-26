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
import getSymbolFromCurrency from "currency-symbol-map";

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      identity: null,
      transactions: []
    };

    this.currentDate = new Date();
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
              startDate: new Date(
                new Date().setFullYear(this.currentDate.getFullYear() - 1)
              )
                .toISOString()
                .split("T")[0],
              endDate: this.currentDate.toISOString().split("T")[0]
            }
          )
          .then(res => {
            this.setState({ transactions: res.data.transactions.transactions });
          })
          .catch(err => {
            console.log(err);
          });
      });

    window.addEventListener("scroll", this.paginate, false);
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.paginate, false);
  }

  paginate = () => {
    const bottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
    if (bottom && !this.state.paginating) {
      this.setState({ paginating: true }, () => {
        const { transactions } = this.state;

        let lastDate = new Date(transactions[transactions.length - 1].date);
        let newDate = new Date();
        newDate.setFullYear(lastDate.getFullYear() - 1);
        newDate = newDate.toISOString().split("T")[0];
        lastDate.setDate(lastDate.getDay() - 1);
        lastDate = lastDate.toISOString().split("T")[0];
        axois
          .post(
            "https://us-central1-tapbanking.cloudfunctions.net/PlaidAPI/transactions",
            {
              access_token: this.state.access_token,
              startDate: newDate,
              endDate: lastDate
            }
          )
          .then(res => {
            this.setState(state => {
              let newTransactions = state.transactions;
              newTransactions.push(...res.data.transactions.transactions);

              return {
                transactions: newTransactions,
                paginating: false
              };
            });
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  };

  redirect = () => {
    this.props.history.push("/plaidlink");
  };

  formatAmount = (x, currencyCode) => {
    return `${x < 0 ? "-" : ""}${getSymbolFromCurrency(currencyCode)}${Math.abs(
      x
    )
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  render() {
    return (
      <Grid>
        <List onScroll={this.paginate}>
          {this.state.transactions.map((transaction, index, transactions) => (
            <div key={transaction.transaction_id}>
              {(index === 0 ||
                transaction.date !== transactions[index - 1].date) && (
                <ListSubheader>{transaction.date}</ListSubheader>
              )}
              <ListItem>
                <ExpansionPanel style={{ flex: 1 }}>
                  <ExpansionPanelSummary style={{ padding: "0 0 0 15px" }}>
                    <Typography variant="overline" style={{ flex: 1 }}>
                      {transaction.name}
                    </Typography>

                    <Typography
                      variant="subheading"
                      style={{
                        color: transaction.amount > 0 ? "red" : "green"
                      }}
                    >
                      {`${this.formatAmount(
                        -transaction.amount,
                        transaction.iso_currency_code
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
                              transaction.pending ? "Pending" : "Completed"
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
          ))}
        </List>
        {(this.state.transactions.length === 0 || this.state.paginating) && (
          <Grid style={{ textAlign: "center" }} item xs={12}>
            <CircularProgress />
          </Grid>
        )}
      </Grid>
    );
  }
}

export default withRouter(Transaction);
