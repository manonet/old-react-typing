import styles from "./program.css";

import config from "../../config";
import React from "react";
import ReactDOM from "react-dom";
import SampleBoard from "./SampleBoard";
import Keyboard from "../keyboard/Keyboard";

let publicFolder = config.publicFolder;

export default class Program extends React.Component {

  constructor() {
    super();
  }

  handleChange (e) {
    var userText = e.target.value;
    this.props.userWrite(userText);
  }

  onFocus (e) {
    this.props.onWriting(true);
  }

  onBlur (e) {
    this.props.onWriting(false);
  }

  // set focus on input
  componentDidMount () {
    ReactDOM.findDOMNode(this.refs.userText).focus();
  }

  render() {
    return (
      <div class="typewriterApp">

        <SampleBoard
          sampleText={this.props.sampleText}
          userText={this.props.userText}
          cursorAt={this.props.cursorAt}
          signToWrite={this.props.signToWrite}
          writtenSign={this.props.writtenSign}
          writtenSign={this.props.writtenSign}
          writing={this.props.writing}
          onChange={this.handleChange.bind(this)}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          ref="userText"
        />
        <Keyboard
          keyboardUrl={publicFolder + "/keyboards/windows/hu-t-k0-windows.xml"}
          onKeyboardLoaded={this.props.onKeyboardLoaded}
          displayedLevel={this.props.displayedLevel}
          keyEvent={this.props.keyEvent}
        />
      </div>
    )
  }
}
