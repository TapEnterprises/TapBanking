import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Account from "./components/Account";
import Settings from "./components/Settings";
import Transaction from "./components/Transaction";
import Budgets from "./components/Budget";
import Savings from "./components/Savings";
import Back from "./components/Navigation";
import PlaidLink from "./components/PlaidLink";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import Notification from "./components/Notification";
import { connect } from "react-redux";
import { setUser } from "./redux/actions";
import firebase from "firebase";
import { CircularProgress, Grid } from "@material-ui/core";

class App extends Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged(this.props.setUser);
  }

  render() {
    return (
      <div className="App">
        {!this.props.user.uid ? (
          <Grid style={{ textAlign: "center" }} item xs={12}>
            <CircularProgress />
          </Grid>
        ) : !this.props.user ? (
          <Login />
        ) : (
          <Router>
            <Back>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route
                  path="/settings/notifications"
                  component={Notification}
                />
                <Route path="/settings" component={Settings} />
                <Route path="/account" component={Account} />
                <Route path="/transaction" component={Transaction} />
                <Route path="/budgets" component={Budgets} />
                <Route path="/savings" component={Savings} />
                <Route path="/plaidlink" component={PlaidLink} />
              </Switch>
            </Back>
          </Router>
        )}
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
