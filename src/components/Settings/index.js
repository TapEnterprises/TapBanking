import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Icon,
  Divider,
  Typography
} from "@material-ui/core";
import firebase from "firebase";
import { withRouter } from "react-router-dom";
import { FiLogOut, FiBell, FiMonitor } from "react-icons/fi";

const Settings = props => {
  const signOut = () => {
    props.history.push("/");
    firebase.auth().signOut();
  };

  const notification = () => {
    props.history.push("/notification");
  };

  return (
    <List>
      <ListItem onClick={notification}>
        <ListItemIcon>
          <Icon>
            <FiBell />
          </Icon>
        </ListItemIcon>
        <ListItemText>Notifications</ListItemText>
      </ListItem>
      <Divider />
      <ListItem onClick={signOut}>
        <ListItemIcon>
          <Icon>
            <FiLogOut />
          </Icon>
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </ListItem>
    </List>
  );
};

export default withRouter(Settings);
