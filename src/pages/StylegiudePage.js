import React from "react";

import TypoSection from "./styleguide/TypoSection";
import KeySection from "./styleguide/KeySection";
import ChartsSection from "./styleguide/ChartsSection";

export default class StylegiudePage extends React.Component {
  render() {

      return (
        <div class="container">
          <h1>StylegiudePage</h1>
          <TypoSection />
          <ChartsSection />
          <KeySection />
        </div>
      )
  }
}
