require("./layout.scss");

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Program from "../program/Program";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      sampleText: "Let's type something...",
      userText: "",
      cursorAt: 0,
      signToWrite: "",
      writtenSign: "",
      nextSign: "",
      writing: false, // whenever the user types (or not)
      keyboardName: "",
      keyboardKeys: []
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
    console.log("signToWrite: " + signToWrite, "writtenSign: " + writtenSign, "nextSign: " + nextSign);
    this.state.keyboardKeys.map(function(item) {
      if (item.to == nextSign || item.shift == nextSign) {
        item.state = "toWrite";
      } else if (item.to == writtenSign || item.shift == writtenSign ) {
        item.state = "error";
        if (signToWrite == writtenSign) {
          item.state = "correct";
        }
      } else {
        item.state = "def";
      }
    });

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
      <div class="layout">
        <Header/>
        <main>
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
              keyboardName={this.state.keyboardName}
              keyboardKeys={this.state.keyboardKeys}
              onKeyboardLoaded={this.onKeyboardLoaded.bind(this)}
            />
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}
