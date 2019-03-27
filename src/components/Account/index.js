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
import { connect } from "react-redux";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      identity: null
    };
  }

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
          {this.props.accounts.length !== 0 ? (
            this.props.accounts.map(account => {
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

const mapStateToProps = ({ user, accounts }) => ({ user, accounts });

export default withRouter(connect(mapStateToProps)(Account));
