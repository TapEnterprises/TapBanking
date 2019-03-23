import React from "react";
import { Button } from "@material-ui/core";
import firebase from "firebase";

const Settings = () => {
  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={() => firebase.auth().signOut()}
      >
        Logout
      </Button>
    </div>
  );
};

export default Settings;
