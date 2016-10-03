import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import UserInput from "./UserInput";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      sampleText: "íme egy hosszú mondat őű...",
      userText: "",
      cursorAt: 0,
      signToWrite: "",
      writtenSign: "",
      focus: false
    };
  }

  userWrite (userText) {
    this.setState({
      userText: userText,
      cursorAt: userText.length,
      signToWrite: this.state.sampleText.substring(this.state.userText.length, this.state.userText.length+1),
      writtenSign: userText.charAt(this.state.cursorAt)
    }); // Thanks to ES6 it is equal with this.setState({title: title})
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
      <div>
        <Header/>
        <UserInput
          sampleText={this.state.sampleText}
          userText={this.state.userText}
          cursorAt={this.state.cursorAt}
          signToWrite={this.state.signToWrite}
          writtenSign={this.state.writtenSign}
          userWrite={this.userWrite.bind(this)}/>
        <Footer />
      </div>
    )
  }
}
