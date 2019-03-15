import React from "react";
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import { FiChevronLeft } from "react-icons/fi";
import { IconContext } from "react-icons";
import { withRouter } from "react-router-dom";

const Back = props => {
  const goback = () => {
    props.history.goBack();
  };

  const location = props.location.pathname;

  if (location !== "/") {
    var indices = [];
    for (var i = 0; i < location.length; i++) {
      if (location[i] === "/") indices.push(i);
    }
    var indexOfLastWord = indices[indices.length - 1];
    var displayTitle = location.slice(indexOfLastWord, location.length);

    return (
      <div>
        <AppBar
          style={{
            backgroundImage: "linear-gradient(to right, #6f48e8, #3c90e8)"
          }}
        >
          <Toolbar>
            <IconButton className="float-left">
              <IconContext.Provider value={{ color: "white" }}>
                <FiChevronLeft onClick={goback} />
              </IconContext.Provider>
            </IconButton>
            <h3 className="float-right">
              {displayTitle.charAt(1).toUpperCase() +
                displayTitle.slice(1).substr(1)}
            </h3>
          </Toolbar>
        </AppBar>
        <div style={{ paddingBottom: "50px" }} />
        {props.children}
      </div>
    );
  } else {
    return props.children;
  }
};

export default withRouter(Back);
