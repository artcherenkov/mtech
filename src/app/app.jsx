import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import CCErrorsPage from "../pages/cc-errors/cc-errors";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <CCErrorsPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
