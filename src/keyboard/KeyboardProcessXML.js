
const parseString = require("xml2js").parseString;

export default function KeyboardProcessXML (xml) {
  let keyboardName, keyboardKeys, keyLevels, allKeyboardChars, transformArray;

  parseString(xml, function (err, result) {
    keyboardName = result.keyboard.names[0].name[0].$.value;
    keyboardKeys = [];
    keyLevels = []; // ["to", "Shift", "altGr", ...]
    let keyMap = result.keyboard.keyMap;
    let transforms = result.keyboard.transforms;
    transformArray = [];
    allKeyboardChars = []; // will contains all characters that is possible to write with actual keyboard layout

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

    // creating an array of objects from transformNode
    let transformNode = transforms[0].transform;
    for (let i = 0; i < transformNode.length; i++) {
      // transformNode[i] is e.g. <transform from="´a" to="á"/>
      let myObj = {};
          myObj.from = transformNode[i].$.from; // e.g. "´a"
          myObj.to = transformNode[i].$.to; // e.g. "á"
      transformArray.push(myObj);

      // extend the allKeyboardChars array with the characters that only can write with key combinations:
      allKeyboardChars.push(myObj.to);
    }

    for (let i = 0; i < keyMap.length; i++) {

      let modifier = "to";
      // we assume that the first item ([0]) is always without transform - TypeError: Cannot read property 'modifiers' of undefined issue
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
        for (let i = 0; i < transformArray.length; i++) {
          // check only the first character e.g from="´a"
          let transform = transformArray[i].from.substring(0,1);
          let char = to; // e.g. to="á"

          if (transform.indexOf(char) !== -1) {
            // if the actual character of the key match with the first character of the transform combination, put it to transformChars
            transformChars += transformArray[i].to;
          }
          // TODO - pop the item from the array, or make somehow faster
        }

        if (modifier === "to") {
          // create the necessary attributes once, at the first time
          let myObj = {};
          myObj[modifier] = to;
          myObj.iso = iso;
          myObj.state = "def";

          if (transformChars.length && transformChars !== " ") {
            // add transform only if not empty or not a space
            myObj.transform = transformChars;
          }

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
    keyboardName,
    keyboardKeys,
    keyLevels,
    allKeyboardChars,
    transformArray
  }
}
