import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import CCErrorsPage from "../pages/cc-errors/cc-errors";
import MelsyPage from "../pages/melsy/melsy";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <CCErrorsPage />
        </Route>
        <Route exact path="/melsy">
          <MelsyPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
