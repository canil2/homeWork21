import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Search from "../src/components/Search/Search";
import Save from "../src/components/Save/Save";
import * as serviceWorker from "./serviceWorker";
import { Router, Route, Link, browserHistory, indexRoute } from "react-router";

ReactDOM.render(
  <Router history={browserHistory}>
    <indexRoute component={Search} />
    <Route path="search" component={Search}></Route>
    <Route path="save" component={Save}></Route>
    <Route path="/" component={Search}></Route>
  </Router>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
