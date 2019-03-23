import React from "react";
import { Snackbar } from "@material-ui/core";

const Notification = props => {
  return (
    <Snackbar
      message={props.message}
      action={props.children}
      autoHideDuration={props.hide}
      open={props.open}
    />
  );
};

export default Notification;
