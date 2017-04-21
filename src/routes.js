import React from "react";
import {Router, Route, browserHistory, IndexRoute} from "react-router";

import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import ProgramPage from "./pages/ProgramPage";
import AboutPage from "./pages/AboutPage";

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={HomePage}/>
    <Route path="/program" component={ProgramPage}/>
    <Route path="/about" component={AboutPage}/>
  </Route>
)