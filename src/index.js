// ! 2

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/Store"

ReactDOM.render(
  // React.StrictMode is replaced by Provider from react-redux
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
