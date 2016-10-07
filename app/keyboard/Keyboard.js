require("./keyboard-key.scss");

import React from "react";
import KeyboardKey from "./KeyboardKey";

export default class Keyboard extends React.Component {

  render() {
    return (
      <div>
        <p>Keyboard</p>
        <KeyboardKey/>
      </div>
    )
  }
}
