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


/*
The harmonized 48 graphic key keyboard arrangement
Keyboards which comply to this narrower specification contain all the keys shown in white in the figure above, the key at C12 shown in yellow, and one of the two keys at E13 and B00 shown in red. The standard does not require this; it only says that keyboards complying to this narrower specification can be called such.
In fact, several layouts (e. g. the US layout), to allow a wider return key, have a key at D13 (shown in green) instead of C12 (shown in yellow). Thus, while they cannot be called “harmonized 48 graphic key keyboards” according to the standard, they still comply to the standard itself. It is to be noted that ISO/IEC 9995-3:2010, in referring to the basic layout within its specific scope, does take a possible substitution of C12 by D13 into account.
*/
