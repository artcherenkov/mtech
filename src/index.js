import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import rootReducer from "./store/reducers/root-reducer";
import { createAPI } from "./services/api";

import App from "./app/app";
import { fetchRecords } from "./store/reducers/cc-errors/actions";

const api = createAPI();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

if (store.getState().USER?.token) {
  store.dispatch(fetchRecords());
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById(`root`)
);
