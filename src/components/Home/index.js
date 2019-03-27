import React, { Component } from "react";
import { Avatar, Card, CardContent, Grid } from "@material-ui/core";
import {
  FiShoppingCart,
  FiSettings,
  FiUser,
  FiDollarSign,
  FiShoppingBag
} from "react-icons/fi";
import "./style.css";
import { toast } from "react-toastify";
import axois from "axios";
import CentralCard from "../Navigation/centralCard";
import cards from "../Navigation/cardData.json";
import db from "../Configs/firebase";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setAccounts, setTransactions } from "../../redux/actions";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBig: false,
      fadeIn: false,
      smallContainer: "",
      data: {},
      toast: false
    };
    this.currentDate = new Date();
    this.cardFunction = this.cardFunction.bind(this);
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
            this.access_token = data.access_token;
          } else if (data.dontSkip) {
            this.handleToast();
          }
        } else {
          docRef.set({
            access_token: null,
            metadata: null,
            dontSkip: true
          });
          this.handleToast();
        }
      })
      .then(() => {
        if (this.props.transactions.length === 0) {
          axois
            .post(
              "https://us-central1-tapbanking.cloudfunctions.net/PlaidAPI/transactions",
              {
                access_token: this.access_token,
                startDate: new Date(
                  new Date().setFullYear(this.currentDate.getFullYear() - 1)
                )
                  .toISOString()
                  .split("T")[0],
                endDate: this.currentDate.toISOString().split("T")[0]
              }
            )
            .then(res => {
              let { transactions, accounts } = res.data.transactions;

              this.props.setTransactions(transactions);
              this.props.setAccounts(accounts);
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(e => e);
  };

  handleToast = () => {
    if (!toast.isActive("mainToast")) {
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
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        }
      );
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
    const { user } = this.props;
    return (
      <div>
        <div className="background">
          <Grid justify="center" container>
            <Card onClick={this.cardFunction}>
              <CardContent
                className={
                  this.state.isBig ? "bigContainer" : this.state.smallContainer
                }
              >
                <Avatar
                  style={{ height: 100, width: 100, fontSize: 35 }}
                  className="homeAvatar"
                  src={user.photoURL}
                >
                  {user.displayName ? user.displayName.charAt(0) : null}
                </Avatar>
                {this.state.fadeIn && this.state.isBig ? (
                  <div className="fadeIn">
                    <h4>
                      Current User: <br /> {user.displayName}
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

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  setTransactions: transactions => dispatch(setTransactions(transactions)),
  setAccounts: accounts => dispatch(setAccounts(accounts))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
