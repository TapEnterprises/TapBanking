import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import home from "./components/Home/home";
import account from "./components/Account/account";
import settings from "./components/Settings/settings";
import transaction from "./components/Transaction/transaction";
import budgets from "./components/Budget/budgets";
import savings from "./components/Savings/savings";
import Back from "./components/Navigation/back";
import PlaidLink from "./components/PlaidLink/plaidlink";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Back>
          <Switch>
            <Route path="/" exact component={home} />
            <Route path="/settings" component={settings} />
            <Route path="/account" component={account} />
            <Route path="/transaction" component={transaction} />
            <Route path="/budgets" component={budgets} />
            <Route path="/savings" component={savings} />
            <Route path="/plaidlink" component={PlaidLink} />
          </Switch>
        </Back>
      </Router>
    </div>
  );
};

export default App;
