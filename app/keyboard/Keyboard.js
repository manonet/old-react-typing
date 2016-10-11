require("./keyboard.scss");

import React from "react";

var parseString = require('xml2js').parseString;
import KeyboardKey from "./KeyboardKey";

export default class Keyboard extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    fetch("http://www.manonet.hu/typing/keyboards/windows/hu-t-k0-windows.xml")
    .then(response => response.text())
    .then(function(response) {
      var xml = response;
      parseString(xml, function (err, result) {
        var keyboardName = result.keyboard["names"][0].name[0].$.value;
        var keyboardKeys = [];
        var modifier = "to";
        var keyMap = result.keyboard.keyMap;

        for (var i = 0; i < keyMap.length; i++) {
          if(i !== 0) {
            switch (keyMap[i].$.modifiers) {
              case "shift":
                modifier = "shift";
                break;
              case "caps":
                modifier = "caps";
                break;
              case "caps+shift":
                modifier = "cs";
                break;
              case "altR+caps? ctrl+alt+caps?":
                modifier = "altgr";
                break;
              case "ctrl+caps?":
                modifier = "cc";
                break;

              default:
                break;
            }
          }

          var map = keyMap[i].map;
          for (let j of map) {

            var to = j.$.to;
            var iso = j.$.iso;

            // unescape unicode
            if (to.indexOf('\\u{') > -1) {
              to = to.replace("\\u{", "&#x");
              to = to.replace("}", ";");
            }

            if (modifier === "to") {
              var myObj = {};
              myObj[modifier] = to
              myObj["iso"] = iso
              myObj["state"] = "def"
              keyboardKeys.push(myObj);
            } else {
              var result = keyboardKeys.filter(function( obj ) {
                return obj.iso == iso;
              });
              result[0][modifier] = to;
            }
          }
        }
        this.props.onKeyboardLoaded({
          keyboardName,
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
        <h3 class="keyboard__title">{this.props.keyboardName}</h3>
        <div class="keyboard__wrapper">
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
        </div>
      </div>
    )
  }
}
