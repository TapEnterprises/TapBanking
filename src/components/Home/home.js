import React from "react";
import CardMenu from "../Navigation/cardMenu";
import { Avatar, Card, CardContent, Grid } from "@material-ui/core";
import "./home.css";

const Home = () => {
  return (
    <div>
      <div className="background">
        <Grid justify="center" container>
          <Card>
            <CardContent>
              <Avatar style={{ height: "60px", width: "60px" }} />
            </CardContent>
          </Card>
        </Grid>
      </div>
      <CardMenu />
    </div>
  );
};

export default Home;
