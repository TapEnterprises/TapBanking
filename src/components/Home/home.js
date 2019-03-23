import React, { Component } from "react";
import { Avatar, Card, CardContent, Grid, Button } from "@material-ui/core";
import {
  FiShoppingCart,
  FiSettings,
  FiUser,
  FiDollarSign,
  FiShoppingBag
} from "react-icons/fi";
import "./home.css";
import CentralCard from "../Navigation/centralCard";
import cards from "../Navigation/cards.json";
import firebase from "firebase";
import db from "../Configuration/firebase";
import { withRouter } from "react-router-dom";
import Notification from "../Common/notification";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      isBig: false,
      fadeIn: false,
      smallContainer: "",
      data: {},
      toast: false
    };
    this.cardFunction = this.cardFunction.bind(this);
  }

  componentDidMount = () => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const docRef = db.collection("users").doc(uid);

    docRef.get().then(doc => {
      if (doc.exists) {
        const data = doc.data();
        if (data.access_token) {
          this.handleToast(false);
        } else {
          this.handleToast(true);
        }
      } else {
        docRef.set({
          access_token: null,
          metadata: null
        });
      }
    });
  };

  handleToast = redirect => {
    if (redirect) {
      this.setState(() => ({ toast: redirect }));
    }
  };

  redirect = () => {
    this.props.history.push("/plaidlink");
  };

  cardFunction = () => {
    if (this.state.isBig && this.state.fadeIn) {
      this.setState({
        fadeIn: false
      });
    } else {
      setTimeout(() => {
        this.setState({
          fadeIn: true
        });
      }, 1000);
    }
    this.setState({
      isBig: !this.state.isBig,
      smallContainer: "smallContainer"
    });
  };

  render() {
    return (
      <div>
        <div className="background">
          <Grid justify="center" container>
            <Notification
              message={
                "You have not logged in with your bank. Would you like to? "
              }
              open={this.state.toast}
              hide={600}
            >
              <Button onClick={this.redirect} color="secondary" size="small">
                Connect to bank
              </Button>
            </Notification>
            <Card onClick={this.cardFunction}>
              <CardContent
                className={
                  this.state.isBig ? "bigContainer" : this.state.smallContainer
                }
              >
                <Avatar style={{ height: "100px", width: "100px" }} />
                {this.state.fadeIn && this.state.isBig ? (
                  <div className="fadeIn">
                    <h4>
                      Current User: <br /> Need Data
                    </h4>
                    <h4>
                      Spending Available: <br /> Need Data
                    </h4>
                    <h4>
                      Total Savings: <br /> Need Data
                    </h4>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </Grid>
        </div>
        <div
          className="foreground"
          style={{ padding: 20, textAlign: "center" }}
        >
          <Grid container justify="center" spacing={8}>
            {cards.map(item => {
              return (
                <CentralCard
                  key={item.pathname}
                  size={item.size}
                  pathname={item.pathname}
                  title={item.title}
                >
                  {item.title === "Transaction" && <FiShoppingCart />}
                  {item.title === "Account" && <FiUser />}
                  {item.title === "Budget" && <FiDollarSign />}
                  {item.title === "Savings" && <FiShoppingBag />}
                  {item.title === "Settings" && <FiSettings />}
                </CentralCard>
              );
            })}
          </Grid>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
