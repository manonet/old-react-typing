require("./keyboard-key.scss");

import React, {PropTypes} from 'react';

import KeyboardKeyEnter from "./KeyboardKeyEnter";

function KeyboardKeyTo (props) {
  if (props.to !== undefined) {
    return (
      <text className="key__to" x="30" y="80">{props.to}</text>
    );
  } else {
    return null;
  }
}

function KeyboardKeyShift (props) {
  if (props.shift !== undefined) {
    return (
      <text className="key__shift" x="30" y="40" dangerouslySetInnerHTML={{__html: props.shift}}/>
    );
  } else {
    return null;
  }
}

function KeyboardKeyCaps (props) {
  if (props.caps !== undefined) {
    return (
      <text className="key__caps" x="50" y="50" dangerouslySetInnerHTML={{__html: props.caps}}/>
    );
  } else {
    return null;
  }
}

function KeyboardKeyCs (props) {
  if (props.cs !== undefined) {
    return (
      <text className="key__cs" x="80" y="50" dangerouslySetInnerHTML={{__html: props.cs}}/>
    );
  } else {
    return null;
  }
}

function KeyboardKeyAltGr (props) {
  if (props.altgr !== undefined) {
    return (
      <text className="key__altgr" x="80" y="80" dangerouslySetInnerHTML={{__html: props.altgr}}/>
    );
  } else {
    return null;
  }
}

function KeyboardKeyCc (props) {
  if (props.cc !== undefined) {
    return (
      <text className="key__cc" x="80" y="50" dangerouslySetInnerHTML={{__html: props.cc}}/>
    );
  } else {
    return null;
  }
}

function KeyboardKeyTransform (props) {
  if (props.transform !== undefined) {
    return (
      <text className="key__transform" dangerouslySetInnerHTML={{__html: props.transform}}/>
    );
  } else {
    return null;
  }
}


export default class KeyboardKey extends React.Component {
  render () {
    let keyObj = this.props.keyObj;

    let keyClass = "key key--" + keyObj.iso.substring(0, 1) + " " + keyObj.iso + " " + keyObj.state;

    // When letters on a case pair are associated with a key, only the capital character need to be shown on the keytop for the primary group, while the lowercase character only is shown for the secondary group.
    if (keyObj.to.toUpperCase() === keyObj.shift) {
      keyClass += " alpha";
    }

    if (keyObj.iso === "D13") {
      return <KeyboardKeyEnter/>
    } else {
      return (
        <g className={keyClass}>
          <rect className="key__bg"/>
          <g className="key__labels" textAnchor="middle">
            <KeyboardKeyTo to={keyObj.to}/>
            <KeyboardKeyShift shift={keyObj.shift}/>
            <KeyboardKeyCaps caps={keyObj.caps}/>
            <KeyboardKeyCs cs={keyObj.cs}/>
            <KeyboardKeyAltGr altgr={keyObj.altgr}/>
            <KeyboardKeyCc cc={keyObj.cc}/>
            <KeyboardKeyTransform transform={keyObj.transform}/>
          </g>
        </g>
      );
    }
  }
}

KeyboardKey.propTypes = {
  keyObj: PropTypes.object.isRequired
};
