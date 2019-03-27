import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Icon,
  Divider
} from "@material-ui/core";
import firebase from "firebase";
import { withRouter } from "react-router-dom";
import { FiLogOut, FiBell, FiGlobe } from "react-icons/fi";

const Settings = props => {
  const signOut = () => {
    props.history.push("/");
    firebase.auth().signOut();
  };

  const notification = () => {
    props.history.push("/settings/notifications");
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
      <Divider />
      <ListItem>
        <ListItemIcon>
          <Icon>
            <FiGlobe />
          </Icon>
        </ListItemIcon>
        <ListItemText>Version 0.0.1</ListItemText>
      </ListItem>
      <Divider />
    </List>
  );
};

export default withRouter(Settings);
