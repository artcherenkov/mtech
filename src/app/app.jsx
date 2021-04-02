import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import DensityPage from "../pages/density/density";
import CCErrorsPage from "../pages/cc-errors/cc-errors";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <CCErrorsPage />
        </Route>
        <Route exact path="/density">
          <DensityPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
