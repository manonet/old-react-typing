import React from "react";
import SampleBoardChar from "./SampleBoardChar";
import SampleBoardHint from "./SampleBoardHint";

export default class SampleBoard extends React.Component {

  constructor() {
    super();
  }

  render() {
    const sampleArray = this.props.sampleText.split("");
    const cursorAt = this.props.cursorAt;
    const writtenSign = this.props.writtenSign;
    const userText = this.props.userText;
    const focus = this.props.writing ? "focus" : "";

    return (
      <div>
        <SampleBoardHint signToWrite={this.props.signToWrite} writtenSign={this.props.writtenSign} />
        <kbd className={"sampleBoard " + focus} >
          {sampleArray.map(function(char, id) {
            return (<SampleBoardChar
              key={id}
              index={id}
              cursorAt={cursorAt}
              writtenSign={writtenSign}
              userText={userText}
              char={char}/>);
          })}
        </kbd>
      </div>
    )
  }
}
