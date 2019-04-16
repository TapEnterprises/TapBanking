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
  SwipeableDrawer,
  Paper,
  Divider
} from "@material-ui/core";
import "./style.css";
import { withRouter } from "react-router-dom";
import getSymbolFromCurrency from "currency-symbol-map";
import { connect } from "react-redux";
import {
  setTransactions,
  addTransactions,
  setAccounts
} from "../../redux/actions";
import { pullMoreTransactions, pullVitalData } from "../../configs/api";

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryFilter: "",
      accountFilter: {
        name: "",
        account_id: ""
      },
      drawer: false
    };

    this.currentDate = new Date();
  }

  componentDidMount = () => {
    pullVitalData();

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
        pullMoreTransactions().then(() => this.setState({ paginating: false }));
      });
    }
  };

  redirect = () => {
    this.props.history.push("/plaidlink");
  };

  toggleDrawer = () => {
    this.setState(preState => ({
      drawer: !preState.drawer
    }));
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
        <Paper
          style={{ padding: "10px", textAlign: "center" }}
          elevation={1}
          onClick={this.toggleDrawer}
        >
          <Chip
            color="primary"
            label="Filters"
            style={{ width: "100%", fontSize: "15px" }}
          />
        </Paper>
        <SwipeableDrawer
          anchor="bottom"
          open={this.state.drawer}
          onClose={this.toggleDrawer}
          onOpen={this.toggleDrawer}
          style={{ borderRadius: "10px" }}
        >
          <Grid container style={{ paddingTop: 5, textAlign: "center" }}>
            <Grid container item direction="column">
              <Typography variant="h6">Account</Typography>
              <Divider variant="middle" style={{ marginBottom: "10px" }} />
            </Grid>

            <Chip
              style={{ margin: "5px" }}
              label="All"
              onClick={() => {
                this.setState({
                  accountFilter: { name: "", account_id: "" }
                });
              }}
              color={
                this.state.accountFilter.name === "" ? "secondary" : "default"
              }
            />
            {this.props.accounts.map(({ name, account_id }) => (
              <Chip
                key={account_id}
                style={{ margin: "5px" }}
                label={name}
                onClick={() => {
                  this.setState({
                    accountFilter: { name, account_id }
                  });
                }}
                color={
                  this.state.accountFilter.name === name
                    ? "secondary"
                    : "default"
                }
              />
            ))}
            <Grid container item direction="column">
              <Typography variant="h6">Categories</Typography>
              <Divider variant="middle" style={{ marginBottom: "10px" }} />
            </Grid>
            <Chip
              style={{ margin: "5px" }}
              label="None"
              onClick={() => {
                this.setState({ categoryFilter: "" });
              }}
              color={this.state.categoryFilter === "" ? "primary" : "default"}
            />
            {this.props.categories.map(item => (
              <Chip
                style={{ margin: "5px" }}
                key={item.index + item}
                label={item}
                onClick={() => {
                  this.setState({ categoryFilter: item });
                }}
                color={
                  this.state.categoryFilter === item ? "primary" : "default"
                }
              />
            ))}
            <div style={{ height: "10vh" }} />
          </Grid>
        </SwipeableDrawer>
        <List>
          {this.props.transactions.map(transaction => {
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
                                  color={
                                    this.state.categoryFilter === item
                                      ? "primary"
                                      : "default"
                                  }
                                  label={item}
                                  onClick={() => {
                                    this.setState({
                                      categoryFilter: item
                                    });
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
            return null;
          })}
        </List>
        {(this.props.transactions.length === 0 || this.state.paginating) && (
          <Grid style={{ textAlign: "center" }} item xs={12}>
            <CircularProgress />
          </Grid>
        )}
      </Grid>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  setTransactions: transactions => dispatch(setTransactions(transactions)),
  addTransactions: transactions => dispatch(addTransactions(transactions)),
  setAccounts: accounts => dispatch(setAccounts(accounts))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Transaction)
);
