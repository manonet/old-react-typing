require("./keyboard-key.scss");

import React from "react";

export default class KeyboardKey extends React.Component {

  render() {
    return (
      <b className={"key " + this.props.iso }>{this.props.to}</b>
    )
  }
}
