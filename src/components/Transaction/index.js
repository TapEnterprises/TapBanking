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
  ListSubheader,
  IconButton
} from "@material-ui/core";
import { MdExpandMore, MdClose } from "react-icons/md";
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
      transactions: [],
      categoryFilter: "",
      categories: [],
      accounts: [],
      accountFilter: {
        name: "",
        account_id: ""
      }
    };

    this.currentDate = new Date();
  }

  componentDidMount = () => {
    const user = this.props.user;
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
            let categories = [];
            let { transactions, accounts } = res.data.transactions;

            transactions.map(trans => {
              trans.category.map(cat => {
                if (!categories.includes(cat)) {
                  categories.push(cat);
                }
              });
            });

            this.setState({ transactions, categories, accounts });
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
              let { transactions } = state;
              transactions.push(...res.data.transactions.transactions);
              let { categories } = state;

              transactions.map(trans => {
                trans.category.map(cat => {
                  if (!categories.includes(cat)) {
                    categories.push(cat);
                  }
                });
              });

              return {
                transactions,
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

  filterCategory = transaction => {
    let filterBool = true;
    if (this.state.categoryFilter !== "") {
      filterBool = transaction.category.includes(this.state.categoryFilter);
    }

    if (this.state.accountFilter.account_id !== "" && filterBool) {
      filterBool =
        this.state.accountFilter.account_id === transaction.account_id;
    }

    return filterBool;
  };

  render() {
    let lastDate = "";
    return (
      <Grid>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
            <Typography>Filters</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container style={{ paddingTop: 5 }}>
              <Grid container item direction="column">
                <Typography>Categories:</Typography>
              </Grid>
              <Grid item style={{ padding: 3 }}>
                <Chip
                  label="None"
                  onClick={() => {
                    this.setState({ categoryFilter: "" });
                  }}
                  color={
                    this.state.categoryFilter === "" ? "primary" : "default"
                  }
                />
              </Grid>
              {this.state.categories.map(item => (
                <Grid item style={{ padding: 3 }} key={item.index + item}>
                  <Chip
                    label={item}
                    onClick={() => {
                      this.setState({ categoryFilter: item });
                    }}
                    color={
                      this.state.categoryFilter === item ? "primary" : "default"
                    }
                  />
                </Grid>
              ))}
              <Grid container item direction="column">
                <Typography>Account:</Typography>
              </Grid>
              <Grid item style={{ padding: 3 }}>
                <Chip
                  label="None"
                  onClick={() => {
                    this.setState({ accountFilter: { name: "", id: "" } });
                  }}
                  color={
                    this.state.accountFilter.name === ""
                      ? "secondary"
                      : "default"
                  }
                />
              </Grid>
              {this.state.accounts.map(({ name, account_id }) => (
                <Grid item style={{ padding: 3 }} key={account_id}>
                  <Chip
                    label={name}
                    onClick={() => {
                      this.setState({ accountFilter: { name, account_id } });
                    }}
                    color={
                      this.state.accountFilter.name === name
                        ? "secondary"
                        : "default"
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <List>
          {this.state.transactions.map((transaction, index, transactions) => {
            if (this.filterCategory(transaction)) {
              const component = (
                <div key={transaction.transaction_id}>
                  {(lastDate === "" || lastDate !== transaction.date) && (
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
                                <Chip
                                  label={item}
                                  onClick={() => {
                                    this.setState({ categoryFilter: item });
                                  }}
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </ListItem>
                </div>
              );

              lastDate = transaction.date;

              return component;
            }
          })}
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
