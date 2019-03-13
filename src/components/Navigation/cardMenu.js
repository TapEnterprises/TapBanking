import React from "react";
import { Grid, CardContent, Card, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiSettings, FiUser } from "react-icons/fi";
import "../Home/home.css";

const CardMenu = () => {
  return (
    <div className="foreground" style={{ padding: 20, textAlign: "center" }}>
      <Grid container justify="center" spacing={8}>
        <Grid item xs={6}>
          <Card>
            <Link
              to={{
                pathname: "/transaction"
              }}
            >
              <IconButton style={{ paddingBottom: "5px" }}>
                <FiShoppingCart />
              </IconButton>
              <CardContent style={{ paddingTop: "unset" }}>
                Transaction
              </CardContent>
            </Link>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Link
            to={{
              pathname: "/account"
            }}
          >
            <Card>
              <IconButton style={{ paddingBottom: "5px" }}>
                <FiUser />
              </IconButton>
              <CardContent style={{ paddingTop: "unset" }}>Account</CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link
            to={{
              pathname: "/settings"
            }}
          >
            <Card>
              <IconButton style={{ paddingBottom: "5px" }}>
                <FiSettings />
              </IconButton>
              <CardContent style={{ paddingTop: "unset" }}>
                Settings
              </CardContent>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default CardMenu;
