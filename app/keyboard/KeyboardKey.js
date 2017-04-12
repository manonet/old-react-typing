require("./keyboard-key.scss");

import React, {PropTypes} from 'react';

import KeyboardKeyEnter from "./KeyboardKeyEnter";

import KeyboardKeyShift from "./KeyboardKeyShift";
import KeyboardKeyCaps from "./KeyboardKeyCaps";
import KeyboardKeyCs from "./KeyboardKeyCs";
import KeyboardKeyAltGr from "./KeyboardKeyAltGr";
import KeyboardKeyCc from "./KeyboardKeyCc";
import KeyboardKeyTo from "./KeyboardKeyTo";


export default class KeyboardKey extends React.Component {
  render () {
    let keyClass = "key key--" + this.props.iso.substring(0, 1) + " " + this.props.iso + " " + this.props.state;

    // When letters on a case pair are associated with a key, only the capital character need to be shown on the keytop for the primary group, while the lowercase character only is shown for the secondary group.
    if (this.props.to.toUpperCase() === this.props.shift) {
      keyClass += " alpha";
    }

    if (this.props.iso === "D13") {
      return <KeyboardKeyEnter/>
    } else {
      return (
        <g className={keyClass}>
          <rect className="key__bg"/>
          <g className="key__labels" textAnchor="middle">
            <KeyboardKeyTo to={this.props.to}/>
            <KeyboardKeyShift shift={this.props.shift}/>
            <KeyboardKeyCaps caps={this.props.caps}/>
            <KeyboardKeyCs cs={this.props.cs}/>
            <KeyboardKeyAltGr altgr={this.props.altgr}/>
            <KeyboardKeyCc cc={this.props.cc}/>
          </g>
        </g>
      );
    }
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
