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
      writing: false // whenever the user types (or not)
    };
  }

  userWrite (userText) {
    this.setState({
      userText: userText,
      cursorAt: userText.length,
      signToWrite: this.state.sampleText.substring(this.state.userText.length, this.state.userText.length+1),
      writtenSign: userText.charAt(this.state.cursorAt)
    });
  }

  onWriting (writing) {
    this.setState({writing}); // Thanks to ES6 it is equal with this.setState({title: title})
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
            />
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}
