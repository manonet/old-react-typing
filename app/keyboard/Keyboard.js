require("./keyboard.scss");

import React from "react";
import KeyboardLoadXML from "./KeyboardLoadXML";

import KeyboardKey from "./KeyboardKey";

export default class Keyboard extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    KeyboardLoadXML(this.props);
  }

  render() {
    return (
      <div class="keyboard">
        <h3 class="keyboard__title">{this.props.keyboardName}</h3>
        <svg className="keyboard__wrapper" version="1.1" viewBox="0 0 1500 500">
        {
          this.props.keyboardKeys.map(function(item) {
            return <KeyboardKey
              key={item.iso}
              iso={item.iso}
              to={item.to}
              shift={item.shift}
              caps={item.caps}
              cs={item.cs}
              altgr={item.altgr}
              cc={item.cc}
              state={item.state}
            />
          })
        }
        </svg>
      </div>
    )
  }
}
