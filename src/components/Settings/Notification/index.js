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
import db from "../../../configs/firebase";
import { connect } from "react-redux";
import { setFirebaseData } from "../../../redux/actions";
import { pullVitalData } from "../../../configs/api";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allNotification: true
    };
  }

  componentDidMount() {
    pullVitalData();
  }

  handleChange = event => {
    const { user } = this.props;
    const toggle = event.target.checked;
    const docRef = db.collection("users").doc(user.uid);
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
                {this.props.allNotification ? <FiBell /> : <FiBellOff />}
              </Icon>
            </ListItemIcon>
            <ListItemText>All Notifications</ListItemText>
            <Switch
              checked={this.props.allNotification}
              onChange={this.handleChange}
            />
          </ListItem>
        </List>
      </div>
    );
  }
}

const mapStateToProps = ({ firebaseData, user }) => ({
  allNotification: firebaseData.dontSkip,
  user
});

const mapDispatchToProps = dispatch => ({
  setFirebaseData: firebaseData => dispatch(setFirebaseData(firebaseData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
