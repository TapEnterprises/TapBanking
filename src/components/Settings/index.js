import React from "react";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import { withRouter } from "react-router-dom";

const Settings = props => {
  const signOut = () => {
    props.history.push("/");
    firebase.auth().signOut();
  };
  return (
    <div>
      <Button variant="contained" color="secondary" fullWidth onClick={signOut}>
        Logout
      </Button>
    </div>
  );
};

export default withRouter(Settings);
