require("./keyboard-key.scss");

import React from "react";

var parseString = require('xml2js').parseString;
import KeyboardKey from "./KeyboardKey";

export default class Keyboard extends React.Component {
  constructor() {
    super();
    this.state = {
      keyboardKeys: []
    };

  }

  componentDidMount() {
    fetch("http://www.manonet.hu/typing/keyboards/windows/hu-t-k0-windows.xml")
    .then(response => response.text())
    .then(function(response) {
      var xml = response;
      parseString(xml, function (err, result) {
          var obj = result.keyboard.keyMap[0].map;
          const keyboardKeys = Object.keys(obj).map(key => obj[key])
          this.setState({
            keyboardKeys
          });
      }.bind(this));
    }.bind(this), function(error) {
      alert(error.message);
    });
  }

  render() {
    return (
      <div>
      {
        this.state.keyboardKeys.map(function(item) {
          return <KeyboardKey key={item.$.iso} iso={item.$.iso} to={item.$.to}/>
        })
       }
      </div>
    )
  }
}
