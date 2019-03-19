import React, { Component } from "react";
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

class Home extends Component {
  constructor() {
    super();
    this.state = {
      isBig: false,
      fadeIn: false,
      smallContainer: ""
    };
    this.cardFunction = this.cardFunction.bind(this);
  }

  cardFunction() {
    if (this.state.isBig && this.state.fadeIn) {
      this.setState({
        fadeIn: false
      });
    } else {
      setTimeout(() => {
        this.setState({
          fadeIn: true
        });
      }, 1000);
    }
    this.setState({
      isBig: !this.state.isBig,
      smallContainer: "smallContainer"
    });
  }

  render() {
    return (
      <div>
        <div className="background">
          <Grid justify="center" container>
            <Card onClick={this.cardFunction}>
              <CardContent
                className={
                  this.state.isBig ? "bigContainer" : this.state.smallContainer
                }
              >
                <Avatar style={{ height: "100px", width: "100px" }} />
                {this.state.fadeIn && this.state.isBig ? (
                  <div className="fadeIn">
                    <h4>
                      Current User: <br /> Need Data
                    </h4>
                    <h4>
                      Spending Available: <br /> Need Data
                    </h4>
                    <h4>
                      Total Savings: <br /> Need Data
                    </h4>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </Grid>
        </div>
        <div
          className="foreground"
          style={{ padding: 20, textAlign: "center" }}
        >
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
  }
}

export default Home;
