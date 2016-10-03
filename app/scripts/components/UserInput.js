import React from "react";
import SampleBoard from "./SampleBoard";

export default class UserInput extends React.Component {

  constructor() {
    super();
  }

  handleChange (e) {
    const userText = e.target.value;
    this.props.userWrite(userText);
  }

  render() {
    return (
      <div class="typewriterApp">
        <textarea
          class="userText"
          value={this.props.userText}
          onChange={this.handleChange.bind(this)}
        ></textarea>

        <SampleBoard
          sampleText={this.props.sampleText}
          userText={this.props.userText}
          cursorAt={this.props.cursorAt}
          signToWrite={this.props.signToWrite}
          writtenSign={this.props.writtenSign}
        />

      </div>
    )
  }
}
