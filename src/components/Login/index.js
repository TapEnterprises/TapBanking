import React, { Component } from "react";
import { TextField, FormControl, Button } from "@material-ui/core";
import firebase from "firebase";
import "./style.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loggingIn: true,
      errorCode: "",
      errorMessage: ""
    };
  }

  attemptAuth = async () => {
    this.setState({ errorCode: "", errorMessage: "" });

    try {
      const auth = await firebase.auth();
      if (this.state.loggingIn) {
        await auth.signInWithEmailAndPassword(
          this.state.Email,
          this.state.Password
        );
      } else {
        await auth.createUserWithEmailAndPassword(
          this.state.Email,
          this.state.Password
        );

        const user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: [this.state.FirstName, this.state.LastName].join(" ")
        });
      }
    } catch (err) {
      this.setState({ errorCode: err.code });

      toast.error(err.message, {
        toastId: "mainToast",
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
  };

  handleEvent = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <div className="loginBackground login">
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
                {!this.state.loggingIn && (
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
                )}
                <TextField
                  label="Email"
                  name="Email"
                  type="email"
                  autoComplete="current-user"
                  margin="normal"
                  onChange={this.handleEvent}
                  style={{ width: "70vw" }}
                  error={this.state.errorCode === "auth/user-not-found"}
                />
                <TextField
                  label="Password"
                  name="Password"
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  onChange={this.handleEvent}
                  style={{ width: "70vw" }}
                  error={this.state.errorCode === "auth/wrong-password"}
                />
              </div>
              <Button
                variant="contained"
                size="large"
                style={{ margin: "0 20vw" }}
                onClick={this.attemptAuth}
              >
                {this.state.loggingIn ? "Login" : "Register"}
              </Button>

              {this.state.loggingIn && (
                <div>
                  <br />
                  <div className="loginHref">Forgot Password?</div>
                </div>
              )}

              <br />
              <div
                onClick={() =>
                  this.setState({ loggingIn: !this.state.loggingIn })
                }
                className="loginHref"
              >
                {this.state.loggingIn
                  ? "Need to register?"
                  : "Already have an account?"}
              </div>
            </FormControl>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default Login;
