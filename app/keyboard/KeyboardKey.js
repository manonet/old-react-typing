require("./keyboard-key.scss");

import React from "react";

export default class KeyboardKey extends React.Component {

  render() {
    var rowClass = "key--" + this.props.iso.substring(0, 1)

    return (
      <b className={"key " + rowClass + " " + this.props.iso + " " + this.props.state }>
        <i class="to">{this.props.to}</i>
        <i class="shift" dangerouslySetInnerHTML={{__html: this.props.shift}}/>
        <i class="caps" dangerouslySetInnerHTML={{__html: this.props.caps}}/>
        <i class="cs" dangerouslySetInnerHTML={{__html: this.props.cs}}/>
        <i class="altgr" dangerouslySetInnerHTML={{__html: this.props.altgr}}/>
        <i class="cc" dangerouslySetInnerHTML={{__html: this.props.cc}}/>
      </b>
    )
  }
}
