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
                      <div style={{ paddingTop: "25px" }}>
                        <Chip
                          color="primary"
                          label={`Current Balance $${account.balances.current}`}
                        />
                        <Chip color="secondary" label={account.subtype} />
                      </div>
                    </CardContent>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
                        More Information
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <h1>More Information</h1>
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

export default Account;
