
const parseString = require("xml2js").parseString;

import vars from "../variables";

export default function KeyboardProcessXML (xml) {
  let keyboardName, keyboardKeys, keyLevels, allKeyboardChars, deadKeys, functionKeys;

  parseString(xml, function (err, result) {
    keyboardName = result.keyboard.names[0].name[0].$.value;
    keyboardKeys = [];
    keyLevels = []; // ["to", "Shift", "altGr", ...]
    let keyMap = result.keyboard.keyMap;
    let transforms = result.keyboard.transforms;
    deadKeys = [];
    allKeyboardChars = []; // will contains all characters that is possible to write with actual keyboard layout

    // https://en.wikipedia.org/wiki/ISO/IEC_9995
    functionKeys = {
        backspace: {
          "to": "⟵",
          "iso": "E14",
          "state": "def"
        },

        tab: {
          "to": "↹",
          "iso": "D00",
          "state": "def"
        },

        enterTop: {
          "to": "↵",
          "iso": "D13",
          "state": "def"
        },

        capsLock: {
          "to": "Caps Lock",
          "iso": "C00",
          "state": "def"
        },

        leftShift: {
          "to": "⇧",
          "iso": "B99",
          "state": "def"
        },

        rightShift: {
          "to": "⇧",
          "iso": "B13",
          "state": "def"
        },

        leftCtrl: {
          "to": "Ctrl",
          "iso": "A99",
          "state": "def"
        },

        fn: {
          "to": "Fn",
          "iso": "A00",
          "state": "def"
        },

        leftCommand: {
          "to": "⌘",
          "iso": "A01",
          "state": "def"
        },

        alt: {
          "to": "Alt",
          "iso": "A02",
          "state": "def"
        },

        altGr: {
          "to": "Alt Gr",
          "iso": "A08",
          "state": "def"
        },

        rightCommand: {
          "to": "⌘",
          "iso": "A09",
          "state": "def"
        },

        menu: {
          "to": "Menu",
          "iso": "A11",
          "state": "def"
        },

        rightCtrl: {
          "to": "Ctrl",
          "iso": "A12",
          "state": "def"
        },
      };

    if (transforms) {
      // creating an array of objects from transformNode
      let transformNode = transforms[0].transform;
      for (let i = 0; i < transformNode.length; i++) {
        // transformNode[i] is e.g. <transform from="´a" to="á"/>
        let myObj = {};
            myObj.from = transformNode[i].$.from; // e.g. "´a"
            myObj.to = transformNode[i].$.to; // e.g. "á"
        deadKeys.push(myObj);

        // extend the allKeyboardChars array with the characters that only can write with key combinations:
        allKeyboardChars.push(myObj.to);
      }
    }

    for (let i = 0; i < keyMap.length; i++) {

      let modifier = "to";
      // we assume that the first item ([0]) is always without transform - TypeError: Cannot read property 'modifiers' of undefined issue
      if(i !== 0) {
        if (keyMap[i].$.modifiers === "shift") {
          modifier = "shift";
        } else if (keyMap[i].$.modifiers === "caps") {
          modifier = "caps";
        } else if (keyMap[i].$.modifiers === "caps+shift") {
          modifier = "cs";
        } else if (keyMap[i].$.modifiers === "cs") {
          modifier = "caps";
        } else if (keyMap[i].$.modifiers.lastIndexOf("altR+caps") !== -1) {
          modifier = "altGr";
        } else if (keyMap[i].$.modifiers === "ctrl+caps?") {
          modifier = "cc";
        } else {
          // prevent double ISO key in map
          modifier = "";
        }
      }

      keyLevels.push(modifier);

      let mapNode = keyMap[i].map;
      for (let map of mapNode) {
        // loop trough each keyMap, e.g. <map iso="E00" to="0"/>
        let to = map.$.to;
        let iso = map.$.iso;

        // unescape unicode e.g. \u{22}
        if (to.indexOf("\\u{") > -1) {
          to = to.replace("\\u{", "&#x");
          to = to.replace("}", ";");
        }

        // extend the allKeyboardChars array with the characters:
        allKeyboardChars.push(to);

        let transformChars = "";
        for (let i = 0; i < deadKeys.length; i++) {
          // check only the first character e.g from="´a"
          let transform = deadKeys[i].from.substring(0,1);
          let char = to; // e.g. to="á"

          if (transform.indexOf(char) !== -1) {
            // if the actual character of the key match with the first character of the transform combination, put it to transformChars
            transformChars += deadKeys[i].to;
          }
          // TODO - pop the item from the array, or make somehow faster
        }

        if (modifier === "to") {
          // create the necessary attributes once, at the first time
          let myObj = {};
          myObj[modifier] = to;
          myObj.iso = iso;
          myObj.state = "def";

          let rowLetter = iso.substring(0,1);
          let row = 0;
          let column = parseInt(iso.substring(1,3));
          let translateX = vars.keyWidth * column;
          let translateY = 0;

          switch (rowLetter) {
            case "D":
              row = 1;
              translateX = vars.dRowShift + vars.keyWidth * column;
              translateY = vars.keyHeight;
              break;
            case "C":
              translateX = vars.cRowShift + vars.keyWidth * column;
              translateY = vars.keyHeight * 2;
              break;
            case "B":
              translateX = vars.bRowShift + vars.keyWidth * column;
              translateY = vars.keyHeight * 3;
              break;
            case "A":
              translateX = vars.aRowShift + vars.keyWidth * column;
              translateY = vars.keyHeight * 4;
              break;
            default:
              break;
          }

          myObj.translate = "translate(" + translateX + ", " + translateY + ")";

          if (transformChars.length && transformChars !== " ") {
            // add transform only if not empty or not a space
            myObj.transform = transformChars;
          }

          // add modifier keys before:
          if (iso === "C01") {
            keyboardKeys.push(functionKeys.enterTop);
            keyboardKeys.push(functionKeys.capsLock);
          }
          if (iso === "B00") {
            keyboardKeys.push(functionKeys.leftShift);
          }
          if (iso === "A03") {
            keyboardKeys.push(functionKeys.rightShift);
            keyboardKeys.push(functionKeys.leftCtrl);
            keyboardKeys.push(functionKeys.fn);
            keyboardKeys.push(functionKeys.leftCommand);
            keyboardKeys.push(functionKeys.alt);
          }

          keyboardKeys.push(myObj);

          // add modifier keys after:
          if (iso === "E12") {
            keyboardKeys.push(functionKeys.backspace);
            keyboardKeys.push(functionKeys.tab);
          }

          if (iso === "A03") {
            keyboardKeys.push(functionKeys.altGr);
            keyboardKeys.push(functionKeys.rightCommand);
            keyboardKeys.push(functionKeys.menu);
            keyboardKeys.push(functionKeys.rightCtrl);
          }

        } else {
          let result = keyboardKeys.filter(function( obj ) {
            return obj.iso == iso;
          });
          result[0][modifier] = to;

          if (transformChars.length && transformChars !== " ") {
            result[0].transform = transformChars;
          }
        }
      }
    }
  });

  // Unique values in an array
  allKeyboardChars = [...new Set(allKeyboardChars)];

  // sort TODO - lang
  allKeyboardChars.sort(function(a, b) {
    return a.localeCompare(b, "hu", { sensitivity: "variant"});
  });

  return {
    keyboard: {
      "name": keyboardName,
      "keys": keyboardKeys,
      "levels": keyLevels,
      "allChars": allKeyboardChars,
      deadKeys,
      functionKeys
    }
  };
}
