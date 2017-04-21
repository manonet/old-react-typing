import React from "react";
import Program from "../program/Program";
import Keyboard from "../keyboard/Keyboard";

import config from "../../config";

let publicFolder = config.publicFolder;

export default class ProgramPage extends React.Component {
  constructor() {
    super();
    this.state = {
      sampleText: "Líć et's Type Something (@)...",
      userText: "",
      cursorAt: 0,
      signToWrite: "",
      writtenSign: "",
      nextSign: "",
      writing: false, // whenever the user types (or not)
      keyboardName: "",
      keyboardKeys: [],
      keyLevels: [],
      //allKeyboardChars
      transformArray: [],
      markFunctionKey: this.markFunctionKey.bind(this)
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

    //console.log("transformArray: " + this.state.transformArray);
    //console.log("signToWrite: " + signToWrite, "writtenSign: " + writtenSign, "nextSign: " + nextSign);
    let state = this.state;

    // save the status of searching for characters for performance
    let nextSignFound = false;
    let writtenSignFound = false;
    let signToWriteFound = false;
    let stillSearching = true;

    for (let i = 0; i < this.state.keyLevels.length; i++) {
      // loop trough each level first, then the keys. It is necessary, because the same character can be appear multiple times on the same keyboard, e.g. "í" on hungarian, once "normal" in "to" level, once on the "j" key in "AltGr" level.

      let level = this.state.keyLevels[i];

      if (stillSearching) {
        // map only if the characters not found yet. Once need to be map all keys to reset the state.
        this.state.keyboardKeys.map(function(item) {
          // loop trough each keyboard key

          // reset the state of each key on each input change (only once in loop)
          if (level === "to") {
            item.state = "def";
          }

          if (stillSearching) {
            // if not all key found, check the character on the key at the specified level
            if(!nextSignFound && item[level] === nextSign) {
              if (level !== "to") {
                // key combination, using of function key necessary
                state.markFunctionKey(level);
              }
              item.state = "toWrite";
              nextSignFound = true;
            }
            if (!writtenSignFound && item[level] === writtenSign) {
              item.state = "error";
              if (signToWrite === writtenSign) {
                item.state = "correct";
              }
              writtenSignFound = true;
            }
            if (!signToWriteFound && item[level] === signToWrite) {
              if (signToWrite !== writtenSign) {
                item.state = "missed";
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
      //the character not appears on any key, so search for it in the transformArray
      // console.log("transform"); TODO don't run this function on the first time

      let transformArray = this.state.transformArray
      for (let i = 0; i < transformArray.length; i++) {
        let transform = transformArray[i];

        let combo1 = transform.from.substring(0,1);
        let combo2 = transform.from.substring(1,2);

        if (!nextSignFound && transform.to === nextSign) {
          // if the character found in the transform array

          for (let i = 0; i < this.state.keyLevels.length; i++) {
            // loop trough each level again
            let level = this.state.keyLevels[i];
            this.state.keyboardKeys.map(function(item) {
              // and map each keyboard key again
              if(item[level] === combo1) {
                if (level !== "to") {
                  // key combination, using of function key necessary
                  state.markFunctionKey(level);
                }
                item.state = "toWrite";
                nextSignFound = true; // it is enough to check only one half of the sign in the same loop, because the sign is found anyway
              }
              if(item[level] === combo2) {
                if (level !== "to") {
                  // key combination, using of function key necessary
                  state.markFunctionKey(level);
                }
                item.state = "toWrite secondary";
              }
            });
          }
        }
        if (!writtenSignFound && transform.to === writtenSign) {
          // if the character found in the transform array

          for (let i = 0; i < this.state.keyLevels.length; i++) {
            // loop trough each level again
            let level = this.state.keyLevels[i];
            this.state.keyboardKeys.map(function(item) {
              // and map each keyboard key again
              if(item[level] === combo1) {
                item.state = "error";
                if (signToWrite === writtenSign) {
                  item.state = "correct";
                }
                writtenSignFound = true;
              }
              if(item[level] === combo2) {
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

          for (let i = 0; i < this.state.keyLevels.length; i++) {
            // loop trough each level again
            let level = this.state.keyLevels[i];
            this.state.keyboardKeys.map(function(item) {
              // and map each keyboard key again
              if(item[level] === combo1) {
                if (signToWrite !== writtenSign) {
                  item.state = "missed";
                }
                signToWriteFound = true;
              }
              if(item[level] === combo2) {
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

  markFunctionKey (level) {
    // reset all key status before
    console.log(level);
  }

  componentDidMount () {
    // Todo ?
    // this.userWrite("");
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
        <div class="container">
          <Keyboard
            keyboardUrl={publicFolder + "/keyboards/windows/es-t-k0-windows.xml"}
            onKeyboardLoaded={function(){}}
          />
          <Program
            sampleText={this.state.sampleText}
            userText={this.state.userText}
            cursorAt={this.state.cursorAt}
            signToWrite={this.state.signToWrite}
            writtenSign={this.state.writtenSign}
            userWrite={this.userWrite.bind(this)}
            onWriting={this.onWriting.bind(this)}
            writing={this.state.writing}
            keyboardName={this.state.keyboardName}
            keyboardKeys={this.state.keyboardKeys}
            onKeyboardLoaded={this.onKeyboardLoaded.bind(this)}
          />
        </div>
      )
  }
}
