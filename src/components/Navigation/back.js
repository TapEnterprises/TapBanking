import React from "react";
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import { FiChevronLeft } from "react-icons/fi";
import { IconContext } from "react-icons";
import { withRouter } from "react-router-dom";

const Back = props => {
  const goback = () => {
    props.history.goBack();
  };

  return (
    <div style={{ paddingBottom: "50px" }}>
      <AppBar
        style={{
          backgroundImage: "linear-gradient(to right, #6f48e8, #3c90e8)"
        }}
      >
        <Toolbar>
          <IconButton>
            <IconContext.Provider value={{ color: "white" }}>
              <FiChevronLeft onClick={goback} />
            </IconContext.Provider>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Back);
