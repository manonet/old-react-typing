import React from "react";
import Program from "../program/Program";
import Keyboard from "../keyboard/Keyboard";

export default class ProgramPage extends React.Component {
  constructor() {
    super();
    this.state = {
      sampleText: "Let's Type Something (@)...",
      userText: "",
      cursorAt: 0,
      signToWrite: "",
      writtenSign: "",
      nextSign: "",
      writing: false, // whenever the user types (or not)
      keyboardName: "",
      keyboardKeys: [],
      //allKeyboardChars
      //transforms
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

    this.markKeyboardForType (signToWrite,writtenSign,nextSign);
  }

  onWriting (writing) {
    this.setState({writing});
  }

  onKeyboardLoaded (data) {
    this.setState(data);
    this.markKeyboardForType(this.state.signToWrite,this.state.writtenSign,this.state.nextSign);
  }

  markKeyboardForType (signToWrite,writtenSign,nextSign) {

    //console.log("transforms: " + this.state.transforms);
    //console.log("signToWrite: " + signToWrite, "writtenSign: " + writtenSign, "nextSign: " + nextSign);
    let state = this.state;

    // save the status of searching for characters for performance
    let nextSignFound = false;
    let writtenSignFound = false;
    let signToWriteFound = false;
    let stillSearching = true;

    this.state.keyboardKeys.map(function(item) {
      // loop trough each keyboard key

      // reset the state of each key on each input change
      item.state = "def";

      if (stillSearching) {
        // if not all key found, loop trough each character on the key
        for (let key in item) {
          //console.log(item, key, item[key]);
          if(!nextSignFound && item[key] === nextSign) {
            if (key !== "to") {
              // key combination, using of function key necessary
              state.markFunctionKey(key);
            }
            item.state = "toWrite";
            nextSignFound = true;
          }
          if (!writtenSignFound && item[key] === writtenSign ) {
            item.state = "error";
            if (signToWrite === writtenSign) {
              item.state = "correct";
            }
            writtenSignFound = true;
          }
          if (!signToWriteFound && item[key] === signToWrite) {
            if (signToWrite !== writtenSign) {
              item.state = "missed";
            }
            signToWriteFound = true;
          }
        }
        if (nextSignFound && writtenSignFound && signToWriteFound) {
          // all character found, no search more necessary
          stillSearching = false;
        }
      }
    });

  }

  markFunctionKey (level) {
    // reset all key status before
    console.log(level);
  }

  componentDidMount () {
    // Todo ?
    this.userWrite("");
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
            keyboardUrl="http://127.0.0.1:3000/keyboards/windows/es-t-k0-windows.xml"
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
