import React from "react";
import { Grid, CardContent, Card, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";

const CentralCard = props => {
  return (
    <Grid item xs={props.size}>
      <Card>
        <Link
          to={{
            pathname: `${props.pathname}`
          }}
        >
          <IconButton style={{ paddingBottom: "5px" }}>
            {props.children}
          </IconButton>
          <CardContent style={{ paddingTop: "unset" }}>
            {props.title}
          </CardContent>
        </Link>
      </Card>
    </Grid>
  );
};

export default CentralCard;
