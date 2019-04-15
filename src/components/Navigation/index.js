import React, { Component } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem
} from "@material-ui/core";
import { FiChevronLeft, FiMoreVertical } from "react-icons/fi";
import { IconContext } from "react-icons";
import { withRouter } from "react-router-dom";
import routes from "./quickRoutes.json";

class Back extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { children, location, history } = this.props;
    const Path = location.pathname;
    const open = Boolean(anchorEl);

    const locationWithoutBack = () => {
      switch (Path) {
        case "/":
          return true;
        case "/plaidlink":
          return true;
        default:
          return false;
      }
    };

    const goback = () => {
      history.goBack();
    };

    const redirect = route => {
      this.handleClose();
      history.push(route);
    };

    if (!locationWithoutBack()) {
      var indices = [];
      for (var i = 0; i < Path.length; i++) {
        if (Path[i] === "/") indices.push(i);
      }
      const indexOfLastWord = indices[indices.length - 1];
      const displayTitle = Path.slice(indexOfLastWord, Path.length);
      return (
        <div>
          <AppBar
            style={{
              backgroundImage: "linear-gradient(to right, #6f48e8, #3c90e8)"
            }}
          >
            <Toolbar>
              <IconButton
                aria-label="More"
                aria-owns={open ? "long-menu" : undefined}
                aria-haspopup="true"
                onClick={goback}
              >
                <IconContext.Provider value={{ color: "white" }}>
                  <FiChevronLeft />
                </IconContext.Provider>
              </IconButton>
              <Typography variant="h6" style={{ flexGrow: 1, color: "white" }}>
                {displayTitle.charAt(1).toUpperCase() +
                  displayTitle.slice(1).substr(1)}
              </Typography>
              <IconButton onClick={this.handleClick}>
                <IconContext.Provider value={{ color: "white" }}>
                  <FiMoreVertical />
                </IconContext.Provider>
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={this.handleClose}
              >
                {routes.map(route => {
                  if (route.path !== Path) {
                    return (
                      <MenuItem
                        key={route.path}
                        onClick={() => redirect(route.path)}
                      >
                        {route.name}
                      </MenuItem>
                    );
                  }
                  return null;
                })}
              </Menu>
            </Toolbar>
          </AppBar>
          <div style={{ paddingTop: "3vh", paddingBottom: "50px" }} />
          {children}
        </div>
      );
    } else {
      return children;
    }
  }
}

export default withRouter(Back);
