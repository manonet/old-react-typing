import React from "react";
import Program from "../program/Program";
import Keyboard from "../keyboard/Keyboard";
import config from "../../config";

let publicFolder = config.publicFolder;

export default class ProgramPage extends React.Component {
  constructor() {
    super();
    this.state = {
      sampleText: "LíćČ et's Type Something (@)...",
      userText: "",
      cursorAt: 0,
      signToWrite: "",
      writtenSign: "",
      nextSign: "",
      writing: false, // whenever the user types (or not)
      keyboard: {
        name: "",
        keys: [],
        levels: [],
        allChars: [],
        deadKeys: [],
        functionKeys: {}
      },
      keyEvent: {
        altKey: false,
        bubbles: true,
        cancelBubble: false,
        cancelable: true,
        charCode: 0,
        code: "", // e.g. "F12"
        composed: true,
        ctrlKey: false,
        currentTarget: null,
        defaultPrevented: false,
        detail: 0,
        eventPhase: 0,
        isComposing: false,
        isTrusted: true,
        key: "", // e.g. "F12"
        keyCode: 0, // e.g. 123
        location: 0,
        metaKey: false,
        path: [],
        repeat: false,
        returnValue: true,
        shiftKey: false,
        sourceCapabilities: null, // e.g. InputDeviceCapabilities
        srcElement: null, // e.g. body
        target: null, // e.g. body
        timeStamp: 0, // e.g. 6372.995000000001
        type: "", // e.g. keydown
        view: null, // e.g. Window
        which: 0, // e.g. 123

        CapsLock: false
      },

      displayedLevel: "to",

      markFunctionKey: this.markFunctionKey.bind(this),
      handleKeydown: this.handleKeydown.bind(this),
      handleKeypress: this.handleKeypress.bind(this),
      handleKeyup: this.handleKeyup.bind(this)
    };
  }

  userWrite (userText) {
    var signToWrite = (userText.length >= 1) ? this.state.sampleText.substring(userText.length-1, userText.length) : "";
    var cursorAt = userText.length;
    var writtenSign = (cursorAt > 0) ? userText.charAt(cursorAt-1) : "";
    var nextSign = this.state.sampleText.charAt(cursorAt);

    this.setState({
      userText,
      cursorAt,
      signToWrite,
      writtenSign,
      nextSign
    });

    this.markKeyboardForType(signToWrite,writtenSign,nextSign);
  }

  onWriting (writing) {
    this.setState({writing});
    //this.userWrite("");
  }

  onKeyboardLoaded (data) {
    this.setState(data);
    // TODO handle onKeyboardLoaded and markKeyboardForType
    //this.markKeyboardForType(this.state.signToWrite,this.state.writtenSign,this.state.nextSign);

  }

  markKeyboardForType (signToWrite,writtenSign,nextSign) {

    //console.log("keyboard.deadKeys: " + this.state.keyboard.deadKeys);
    //console.log("signToWrite: " + signToWrite, "writtenSign: " + writtenSign, "nextSign: " + nextSign);
    let state = this.state;
    let keyboard = this.state.keyboard;
    let levels = keyboard.levels;
    let keys = keyboard.keys;
    let functionKeys = keyboard.functionKeys;

    // save the status of searching for characters for performance
    let nextSignFound = false;
    let writtenSignFound = false;
    let signToWriteFound = false;
    let stillSearching = true;

    // TODO - move this function to a shared place (make it global accessible)
    function mapObject(object, callback) {
      return Object.keys(object).map(function (key) {
        return callback(key, object[key]);
      });
    }

    mapObject(functionKeys, function (key, value) {
      // reset function keys
      functionKeys[key].state = "def";
    })

    for (let i = 0; i < levels.length; i++) {
      // loop trough each level first, then the keys. It is necessary, because the same character can be appear multiple times on the same keyboard, e.g. "í" on hungarian, once "normal" in "to" level, once on the "j" key in "AltGr" level.

      let level = levels[i];

      if (stillSearching) {
        // map only if the characters not found yet. Once need to be map all keys to reset the state.
        keys.map(function(item) {
          // loop trough each keyboard key

          // reset the state of each key on each input change (only once in loop)
          if (level === "to") {
            item.state = "def";
          }

          if (stillSearching) {
            // if not all key found, check the character on the key at the specified level
            if(!nextSignFound && item.labels[level] === nextSign) {
              if (level !== "to") {
                // key combination, using of function key necessary
                state.markFunctionKey(level, "toWrite");
              }
              item.state = "toWrite";
              nextSignFound = true;
            }
            if (!writtenSignFound && item.labels[level] === writtenSign) {
              item.state = "error";
              if (signToWrite === writtenSign) {
                item.state = "correct";
              }
              writtenSignFound = true;
            }
            if (!signToWriteFound && item.labels[level] === signToWrite) {
              if (signToWrite !== writtenSign) {
                item.state = "missed";
                // TODO enable/disable backspace
                state.markFunctionKey("backspace", "toWrite");
              }
              signToWriteFound = true;
            }

            if (nextSignFound && writtenSignFound && signToWriteFound) {
              // all character found, no search more necessary
              stillSearching = false;

              if (level !== "to") {
                // all key status resetted to default, no action more necessary, so exit the loop
                return;
              }
            }
          }
        });
      }
    }
    if (stillSearching) {
      //the character not appears on any key, so search for it in the keyboard.deadKeys
      // console.log("transform"); TODO don't run this function on the first time

      let deadKeys = keyboard.deadKeys;
      for (let i = 0; i < deadKeys.length; i++) {
        let transform = deadKeys[i];

        if (!nextSignFound && transform.to === nextSign) {
          // if the character found in the transform array
          let combo1 = transform.from.substring(0,1);
          let combo2 = transform.from.substring(1,2);
          let combo1Found = false;
          let combo2Found = false;

          for (let i = 0; i < levels.length; i++) {
            // loop trough each level again
            let level = levels[i];

            console.log("test",combo1Found,combo2Found);
            if(!(combo1Found && combo2Found)) {
              // map only if still necessary
              keys.map(function(item) {
                // and map each keyboard key again
                if(!combo1Found && item.labels[level] === combo1) {
                  if (level !== "to") {
                    // key combination, using of function key necessary
                    console.log(item.labels[level]);
                    state.markFunctionKey(level, "toWrite");
                  }
                  item.state = "toWrite";
                  nextSignFound = true; // it is enough to check only one half of the sign in the same loop, because the sign is found anyway
                  combo1Found = true;
                  console.log("combo1Found ",combo1);
                }
                if(!combo2Found && item.labels[level] === combo2) {
                  if (level !== "to") {
                    // key combination, using of function key necessary
                    console.log(item.labels[level]);
                    state.markFunctionKey(level, "toWrite secondary");
                  }
                  item.state = "toWrite secondary";
                  combo2Found = true;
                  console.log("combo2Found ",combo2);
                }
              });

            }
          }
        }
        if (!writtenSignFound && transform.to === writtenSign) {
          // if the character found in the transform array
          let combo1 = transform.from.substring(0,1);
          let combo2 = transform.from.substring(1,2);

          for (let i = 0; i < levels.length; i++) {
            // loop trough each level again
            let level = levels[i];
            keys.map(function(item) {
              // and map each keyboard key again
              if(item.labels[level] === combo1) {
                item.state = "error";
                if (signToWrite === writtenSign) {
                  item.state = "correct";
                }
                writtenSignFound = true;
              }
              if(item.labels[level] === combo2) {
                item.state = "error";
                if (signToWrite === writtenSign) {
                  item.state = "correct secondary";
                }
              }
            });
          }
        }
        if (!signToWriteFound && transform.to === signToWrite) {
          // if the character found in the transform array
          let combo1 = transform.from.substring(0,1);
          let combo2 = transform.from.substring(1,2);

          for (let i = 0; i < levels.length; i++) {
            // loop trough each level again
            let level = levels[i];
            keys.map(function(item) {
              // and map each keyboard key again
              if(item.labels[level] === combo1) {
                if (signToWrite !== writtenSign) {
                  item.state = "missed";
                }
                signToWriteFound = true;
              }
              if(item.labels[level] === combo2) {
                if (signToWrite !== writtenSign) {
                  item.state = "missed secondary";
                }
              }
            });
          }
        }

        if (nextSignFound && writtenSignFound && signToWriteFound) {
          // all character found, no search more necessary
          stillSearching = false;
          return;
        }
      }
    }
  }

  markFunctionKey (name, state) {
    // reset all key status before
    console.log(name, state);
    if (name === "shift") {
      // TOTO - assign hands both way: same side or opposit size
      name = "leftShift";
    } else if (name === "altR+caps? ctrl+alt+caps?") {
      name = "altGr";
    }
    // TODO - synch all function keys

    let keyboard = Object.assign({}, this.state.keyboard);
    keyboard.functionKeys[name].state = state;
    this.setState({
      keyboard
    });
  }

  componentDidMount () {
    // Todo ?
    // this.userWrite("");
    // use onKeyboardLoaded instead
    document.addEventListener("keydown", this.state.handleKeydown, false);
    //document.addEventListener("keypress", this.state.handleKeypress, false);
    document.addEventListener("keyup", this.state.handleKeyup, false);
  }

  handleKeys (event, source) {
      let keyEvent = Object.assign({}, this.state.keyEvent);
    //console.log(source, event);
    if (event.altKey !== keyEvent.altKey) {
      //console.log("altKey");
      keyEvent.altKey = event.altKey;
      this.setState({
        keyEvent
      });
    }

    if (event.ctrlKey !== keyEvent.ctrlKey) {
      //console.log("ctrlKey");
      keyEvent.ctrlKey = event.ctrlKey;
      this.setState({
        keyEvent
      });
    }
    if (event.metaKey !== keyEvent.metaKey) {
      //console.log("metaKey");
      keyEvent.metaKey = event.metaKey;
      this.setState({
        keyEvent
      });
    }
    if (!event.shiftKey !== !keyEvent.shiftKey) {
      //console.log("shiftKey");
      keyEvent.shiftKey = event.shiftKey;
      this.setState({
        keyEvent
      });
    }


    if (event.getModifierState) {
      //console.log(event.getModifierState("CapsLock"));
      if (event.getModifierState("CapsLock") !== keyEvent.CapsLock) {
        //console.log("CapsLock");
        keyEvent.CapsLock = event.getModifierState("CapsLock");
        this.setState({
          keyEvent
        });
      }
      /*else if (event.getModifierState("CapsLock") && event.getModifierState("shift")) {
        if (name === "caps+shift") {
          visibility = "visible";
        } else if (name === "to") {
          visibility = "hidden";
        }
      } else if (event.getModifierState("AltGraph")) {
        if (name === "altR+caps? ctrl+alt+caps?") {
          visibility = "visible";
        } else if (name === "to") {
          visibility = "hidden";
        }
      } else if (name === "to") {
        visibility = "visible";
      }*/

      /*
      console.log(event.key);
      // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState
      let Alt = event.getModifierState && event.getModifierState("Alt");
      let AltGraph = event.getModifierState && event.getModifierState("AltGraph");
      let CapsLock = event.getModifierState && event.getModifierState("CapsLock");
      let Control = event.getModifierState && event.getModifierState("Control");
      let Meta = event.getModifierState && event.getModifierState("Meta"); // ⌘ Command key
      let NumLock = event.getModifierState && event.getModifierState("NumLock");
      let OS = event.getModifierState && event.getModifierState("OS");
      let ScrollLock = event.getModifierState && event.getModifierState("ScrollLock");
      let Shift = event.getModifierState && event.getModifierState("Shift");
      */
    }
  }

  handleKeydown (event) {
    this.handleKeys (event, "Keydown")
  }

  handleKeypress (event) {
    this.handleKeys (event, "Keypress")
  }

  handleKeyup (event) {
    this.handleKeys (event, "Keyup")
  }

  correction () {
/*
	if (params.writtenSign == params.signToWrite) {
		// written correctly
		params.correct = true;
		params.correct_hits++;
		if(params.correct_hits_array[params.writtenSign]) {
			params.correct_hits_array[params.writtenSign]++;
		} else {
			params.correct_hits_array[params.writtenSign] = 1;
		}
		params.message += "that's correct."
		params.letters[params.cursorAt].addClass('done');

	} else {
		// mistake
		params.correct = false;
		params.miswrite_hits++;
		if(params.miswrite_hits_array[params.writtenSign]) {
			params.miswrite_hits_array[params.writtenSign]++;
		} else {
			params.miswrite_hits_array[params.writtenSign] = 1;
		}
		if(params.misspell_hits_array[params.signToWrite]) {
			params.misspell_hits_array[params.signToWrite]++;
		} else {
			params.misspell_hits_array[params.signToWrite] = 1;
		}
		params.message += "that's wrong."
		params.letters[params.cursorAt].addClass('error');
	}
	params.messagebox.html(params.message);
  */
}
  render() {
      return (
        <main class="main">
          <div class="container">
            <Program
              sampleText={this.state.sampleText}
              userText={this.state.userText}
              cursorAt={this.state.cursorAt}
              signToWrite={this.state.signToWrite}
              writtenSign={this.state.writtenSign}
              userWrite={this.userWrite.bind(this)}
              onWriting={this.onWriting.bind(this)}
              writing={this.state.writing}
              keyboardName={this.state.keyboard.name}
              keyboardKeys={this.state.keyboard.keys}
              onKeyboardLoaded={this.onKeyboardLoaded.bind(this)}
              displayedLevel={this.state.displayedLevel}
              keyEvent={this.state.keyEvent}
            />
            <Keyboard
              keyboardUrl={publicFolder + "/keyboards/windows/es-t-k0-windows.xml"}
              onKeyboardLoaded={function(){}}
              showTitle={true}
              showDeadKeys={true}
            />
            <Keyboard
              keyboardUrl={publicFolder + "/keyboards/osx/hu-t-k0-osx.xml"}
              onKeyboardLoaded={function(){}}
              showTitle={true}
              showDeadKeys={true}
            />
          </div>
        </main>
      )
  }
}
