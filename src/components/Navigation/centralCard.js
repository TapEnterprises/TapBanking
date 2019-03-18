import React from "react";
import { Grid, CardContent, Card, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";

const CentralCard = props => {
  return (
    <Grid item xs={props.size}>
      <Link
        to={{
          pathname: `${props.pathname}`
        }}
      >
        <Card>
          <IconButton style={{ paddingBottom: "5px" }}>
            {props.children}
          </IconButton>
          <CardContent style={{ paddingTop: "unset" }}>
            {props.title}
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default CentralCard;
