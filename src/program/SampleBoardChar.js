import React from "react";

export default class SampleBoardChar extends React.Component {

  constructor() {
    super();
  }

  render() {

    // classes
    var done = (this.props.cursorAt > this.props.index) ? "done " : "";
    var active = (this.props.cursorAt === this.props.index) ? "toWrite " : "";
    var error = (done && this.props.char !== this.props.userText.substring(this.props.index, this.props.index+1)) ? "error " : "";

    var letterToDisplay = (error) ? this.props.userText.substring(this.props.index, this.props.index+1) : this.props.char

    return (
      <i className={"char " + done + active + error}>
          {letterToDisplay}
      </i>
    )
  }
}
