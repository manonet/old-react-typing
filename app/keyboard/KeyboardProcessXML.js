
const parseString = require('xml2js').parseString;

export default function KeyboardProcessXML (xml) {
  let keyboardName, keyboardKeys;

  parseString(xml, function (err, result) {
    keyboardName = result.keyboard["names"][0].name[0].$.value;
    keyboardKeys = [];
    let modifier = "to";
    let keyMap = result.keyboard.keyMap;

    // https://en.wikipedia.org/wiki/ISO/IEC_9995
    let backspace = {
      "to": "⟵",
      "iso": "E14",
      "state": "def"
    };

    let tab = {
      "to": "↹",
      "iso": "D00",
      "state": "def"
    };

    let enterTop = {
      "to": "↵",
      "iso": "D13",
      "state": "def"
    };

    let enter = {
      "to": "↵", // ⤶
      "iso": "C13",
      "state": "def"
    };

    let capsLock = {
      "to": "Caps Lock",
      "iso": "C00",
      "state": "def"
    };

    let leftShift = {
      "to": "⇧",
      "iso": "B99",
      "state": "def"
    };

    let rightShift = {
      "to": "⇧",
      "iso": "B13",
      "state": "def"
    };

    let leftCtrl = {
      "to": "Ctrl",
      "iso": "A99",
      "state": "def"
    };

    let fn = {
      "to": "Fn",
      "iso": "A00",
      "state": "def"
    };

    let leftCommand = {
      "to": "⌘",
      "iso": "A01",
      "state": "def"
    };

    let alt = {
      "to": "Alt",
      "iso": "A02",
      "state": "def"
    };

    let altGr = {
      "to": "Alt Gr",
      "iso": "A08",
      "state": "def"
    };

    let rightCommand = {
      "to": "⌘",
      "iso": "A09",
      "state": "def"
    };

    let menu = {
      "to": "Menu",
      "iso": "A11",
      "state": "def"
    };

    let rightCtrl = {
      "to": "Ctrl",
      "iso": "A12",
      "state": "def"
    };

    for (let i = 0; i < keyMap.length; i++) {
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

      let map = keyMap[i].map;
      for (let j of map) {

        let to = j.$.to;
        let iso = j.$.iso;

        // unescape unicode
        if (to.indexOf('\\u{') > -1) {
          to = to.replace("\\u{", "&#x");
          to = to.replace("}", ";");
        }

        if (modifier === "to") {
          let myObj = {};
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
          let result = keyboardKeys.filter(function( obj ) {
            return obj.iso == iso;
          });
          result[0][modifier] = to;
        }
      }
    }
  });
  return {
    keyboardName,
    keyboardKeys
  }
}
