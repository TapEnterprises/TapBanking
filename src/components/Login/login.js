import React, { Component } from "react";
import { TextField, FormControl, Button } from "@material-ui/core";
import firebase from "firebase";
import "./login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loggingIn: true
    };
    this.handleEvent = this.handleEvent.bind(this);
    this.attemptAction = this.attemptAction.bind(this);
  }
  attemptAction() {
    if (this.state.loggingIn) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.Email, this.state.Password);
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.Email, this.state.Password)
        .then(() => {
          const user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: [this.state.FirstName, this.state.LastName].join(" ")
          });
        });
    }
  }
  handleEvent(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <div>
        <div className="loginBackground">
          <h1>Tap Banking</h1>
          <div
            style={{
              display: "inline-block"
            }}
          >
            <FormControl
              style={{
                backgroundColor: "white",
                width: "90vw",
                textAlign: "center",
                paddingBottom: "2em",
                borderRadius: "10px"
              }}
            >
              <div style={{ display: "inline-block", paddingBottom: "2em" }}>
                {!this.state.loggingIn ? (
                  <div>
                    <TextField
                      label="First Name"
                      name="FirstName"
                      type="text"
                      autoComplete="off"
                      margin="normal"
                      onChange={this.handleEvent}
                      style={{ width: "70vw" }}
                    />
                    <TextField
                      label="Last Name"
                      name="LastName"
                      type="text"
                      autoComplete="off"
                      margin="normal"
                      onChange={this.handleEvent}
                      style={{ width: "70vw" }}
                    />
                  </div>
                ) : null}
                <TextField
                  label="Email"
                  name="Email"
                  type="email"
                  autoComplete="current-user"
                  margin="normal"
                  onChange={this.handleEvent}
                  style={{ width: "70vw" }}
                />
                <TextField
                  label="Password"
                  name="Password"
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  onChange={this.handleEvent}
                  style={{ width: "70vw" }}
                />
              </div>
              <Button
                variant="contained"
                size="large"
                style={{ margin: "0 20vw" }}
                onClick={this.attemptAction}
              >
                {this.state.loggingIn ? "Login" : "Register"}
              </Button>
              {this.state.loggingIn ? (
                <div>
                  <br />
                  <a href="#" className="loginHref">
                    Forgot Password?
                  </a>
                </div>
              ) : null}
              <br />
              <a
                href="#"
                onClick={() =>
                  this.setState({ loggingIn: !this.state.loggingIn })
                }
                className="loginHref"
              >
                {this.state.loggingIn
                  ? "Need to register?"
                  : "Already have an account?"}
              </a>
            </FormControl>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
