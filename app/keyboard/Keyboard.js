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

        // https://en.wikipedia.org/wiki/ISO/IEC_9995
        var backspace = {
          "to": "⟵",
          "iso": "E14",
          "state": "def"
        };

        var tab = {
          "to": "↹",
          "iso": "D00",
          "state": "def"
        };

        var enterTop = {
          "to": "↵",
          "iso": "D13",
          "state": "def"
        };

        var enter = {
          "to": "↵", // ⤶
          "iso": "C13",
          "state": "def"
        };

        var capsLock = {
          "to": "Caps Lock",
          "iso": "C00",
          "state": "def"
        };

        var leftShift = {
          "to": "⇧",
          "iso": "B99",
          "state": "def"
        };

        var rightShift = {
          "to": "⇧",
          "iso": "B13",
          "state": "def"
        };

        var leftCtrl = {
          "to": "Ctrl",
          "iso": "A99",
          "state": "def"
        };

        var fn = {
          "to": "Fn",
          "iso": "A00",
          "state": "def"
        };

        var leftCommand = {
          "to": "⌘",
          "iso": "A01",
          "state": "def"
        };

        var alt = {
          "to": "Alt",
          "iso": "A02",
          "state": "def"
        };

        var altGr = {
          "to": "Alt Gr",
          "iso": "A08",
          "state": "def"
        };

        var rightCommand = {
          "to": "⌘",
          "iso": "A09",
          "state": "def"
        };

        var menu = {
          "to": "Menu",
          "iso": "A11",
          "state": "def"
        };

        var rightCtrl = {
          "to": "Ctrl",
          "iso": "A12",
          "state": "def"
        };

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


              // add modifier keys before:
              if (iso === "C01") {
                keyboardKeys.push(enterTop);
                keyboardKeys.push(capsLock);
              }
              if (iso === "B00") {
                keyboardKeys.push(enter);
                keyboardKeys.push(leftShift);
              }
              if (iso === "A03") {
                keyboardKeys.push(rightShift);
                keyboardKeys.push(leftCtrl);
                keyboardKeys.push(fn);
                keyboardKeys.push(leftCommand);
                keyboardKeys.push(alt);
              }

              keyboardKeys.push(myObj);

              // add modifier keys after:
              if (iso === "E12") {
                keyboardKeys.push(backspace);
                keyboardKeys.push(tab);
              }

              if (iso === "A03") {
                keyboardKeys.push(altGr);
                keyboardKeys.push(rightCommand);
                keyboardKeys.push(menu);
                keyboardKeys.push(rightCtrl);
              }

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
console.log(keyboardKeys);
      }.bind(this));
    }.bind(this), function(error) {
      alert(error.message);
    });
  }

  render() {
    return (
      <div class="keyboard">
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
