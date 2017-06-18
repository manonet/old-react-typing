import React from "react";
import {Router, Route, browserHistory, IndexRoute} from "react-router";

import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import ProgramPage from "./pages/ProgramPage";

import StylegiudePage from "./pages/StylegiudePage";
import TypoSection from "./pages/styleguide/TypoSection";
import KeySection from "./pages/styleguide/KeySection";
import ChartsSection from "./pages/styleguide/ChartsSection";

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={HomePage}/>
    <Route path="home" component={HomePage}/>
    <Route path="program" component={ProgramPage}/>
    <Route path="styleguide" component={StylegiudePage}>
      <IndexRoute component={TypoSection}/>
      <Route path="typo" component={TypoSection}/>
      <Route path="charts" component={ChartsSection}/>
      <Route path="keys" component={KeySection}/>
    </Route>
  </Route>
)
