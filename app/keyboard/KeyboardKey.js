require("./keyboard-key.scss");

import React, {PropTypes} from 'react';
import KeyboardKeyShift from "./KeyboardKeyShift";
import KeyboardKeyCaps from "./KeyboardKeyCaps";
import KeyboardKeyCs from "./KeyboardKeyCs";
import KeyboardKeyAltGr from "./KeyboardKeyAltGr";
import KeyboardKeyCc from "./KeyboardKeyCc";
import KeyboardKeyTo from "./KeyboardKeyTo";


export default class KeyboardKey extends React.Component {
  render () {
    let rowClass = "key--" + this.props.iso.substring(0, 1);

    return (
      <g className={"key " + rowClass + " " + this.props.iso + " " + this.props.state}>
        <rect className="key__bg"/>
        <g className="key__labels" textAnchor="middle">
          <KeyboardKeyShift shift={this.props.shift}/>
          <KeyboardKeyCaps caps={this.props.caps}/>
          <KeyboardKeyCs cs={this.props.cs}/>
          <KeyboardKeyAltGr altgr={this.props.altgr}/>
          <KeyboardKeyCc cc={this.props.cc}/>
          <KeyboardKeyTo to={this.props.to}/>
        </g>
      </g>
    );
  }
}

KeyboardKey.propTypes = {
  iso: PropTypes.string.isRequired,
  state: PropTypes.string,
  shift: PropTypes.string,
  caps: PropTypes.string,
  cs: PropTypes.string,
  altgr: PropTypes.string,
  cc: PropTypes.string,
  to: PropTypes.string
};
