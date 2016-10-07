import React from "react";

export default class SampleBoardHint extends React.Component {

  render() {
    return (
      <p class="sampleBoardHint">Requested: {this.props.signToWrite}, written: {this.props.writtenSign}</p>
    )
  }
}
