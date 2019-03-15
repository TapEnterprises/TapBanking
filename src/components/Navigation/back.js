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

  if (location === "/") {
    return props.children;
  }

  if (location.includes("/transaction")) {
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
            <h3 className="float-right">Transaction</h3>
          </Toolbar>
        </AppBar>
        <div style={{ paddingBottom: "50px" }} />
        {props.children}
      </div>
    );
  }

  if (location.includes("/account")) {
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
            <h3 className="float-right">Account</h3>
          </Toolbar>
        </AppBar>
        <div style={{ paddingBottom: "50px" }} />
        {props.children}
      </div>
    );
  }

  if (location.includes("/budgets")) {
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
            <h3 className="float-right">Budgets</h3>
          </Toolbar>
        </AppBar>
        <div style={{ paddingBottom: "50px" }} />
        {props.children}
      </div>
    );
  }

  if (location.includes("/savings")) {
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
            <h3 className="float-right">Savings</h3>
          </Toolbar>
        </AppBar>
        <div style={{ paddingBottom: "50px" }} />
        {props.children}
      </div>
    );
  }

  if (location.includes("/settings")) {
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
            <h3 className="float-right">Settings</h3>
          </Toolbar>
        </AppBar>
        <div style={{ paddingBottom: "50px" }} />
        {props.children}
      </div>
    );
  }
};

export default withRouter(Back);
