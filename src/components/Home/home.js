import React from "react";
import { Avatar, Card, CardContent, Grid } from "@material-ui/core";
import {
  FiShoppingCart,
  FiSettings,
  FiUser,
  FiDollarSign,
  FiShoppingBag
} from "react-icons/fi";
import "./home.css";
import CentralCard from "../Navigation/centralCard";
import cards from "../Navigation/cards.json";

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
      <div className="foreground" style={{ padding: 20, textAlign: "center" }}>
        <Grid container justify="center" spacing={8}>
          {cards.map(item => {
            return (
              <CentralCard
                key={item.pathname}
                size={item.size}
                pathname={item.pathname}
                title={item.title}
              >
                {item.title === "Transaction" && <FiShoppingCart />}
                {item.title === "Account" && <FiUser />}
                {item.title === "Budget" && <FiDollarSign />}
                {item.title === "Savings" && <FiShoppingBag />}
                {item.title === "Settings" && <FiSettings />}
              </CentralCard>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
