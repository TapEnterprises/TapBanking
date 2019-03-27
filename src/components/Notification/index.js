import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Icon
} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import { FiBell, FiBellOff } from "react-icons/fi";
import db from "../Configs/firebase";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allNotification: true
    };
  }

  componentDidMount = () => {
    const docRef = db.collection("users").doc(this.props.user.uid);
    docRef.get().then(doc => {
      if (doc.exists) {
        const data = doc.data();
        this.setState(() => ({ allNotification: data.dontSkip }));
      }
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked }, () => {});
    const toggle = event.target.checked;
    const docRef = db.collection("users").doc(this.props.user.uid);
    docRef.get().then(doc => {
      if (doc.exists) {
        docRef.update({
          dontSkip: toggle
        });
      }
    });
  };

  render() {
    return (
      <div>
        <List>
          <ListItem>
            <ListItemIcon>
              <Icon>
                {this.state.allNotification ? <FiBell /> : <FiBellOff />}
              </Icon>
            </ListItemIcon>
            <ListItemText>All Notifications</ListItemText>
            <Switch
              checked={this.state.allNotification}
              onChange={this.handleChange("allNotification")}
              value="allNotification"
            />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default Notification;
