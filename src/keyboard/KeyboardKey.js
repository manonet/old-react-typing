require("./keyboard-key.scss");

import React, {PropTypes} from "react";

import vars from "../variables";

import KeyEnter from "./KeyEnter";


// ================================================================================================
// FUNCTION KEYS

function FunctionKeyTab (props) {
  // Tab
  let tabWidth = vars.keyWidth + vars.dRowShift - 2 * vars.keyPaddingX;

  return (
    <g className="key key__tab D00" x={vars.keyPaddingX} y={vars.keyHeight + vars.keyPaddingY}>
      <rect className="key__bg" width={tabWidth} height={vars.keyBgHeight} rx={vars.rX} ry={vars.rY}/>
      <g className="key__labels" textAnchor="middle">
        <text className="key__to" x="30" y="80">↹</text>
      </g>
    </g>
  );
}


function FunctionKeyLeftShift (props) {
  // Left Shift
  let keyObj = props.keyObj;
  let leftShiftWidth = vars.keyWidth + vars.bRowShift - 2 * vars.keyPaddingX;

  return (
    <g className={"key key__left-shift " + keyObj.iso + " " + keyObj.state} x={vars.keyPaddingX} y={vars.keyHeight + vars.keyPaddingY}>
      <rect className="key__bg" width={leftShiftWidth} height={vars.keyBgHeight} rx={vars.rX} ry={vars.rY}/>
      <g className="key__labels" textAnchor="middle">
        <text className="key__to" x="30" y="80">⇧</text>
      </g>
    </g>
  );
}

function FunctionKeyAltGr (props) {
  // AltGr
  let keyObj = props.keyObj;
  let altGrLeft = vars.keyWidth * 9 + vars.aRowShift + vars.keyPaddingX;

  return (
    <g className={"key key__altgr " + keyObj.iso + " " + keyObj.state} x={altGrLeft} y={vars.keyHeight * 4 + vars.keyPaddingY}>
      <rect className="key__bg" width={vars.keyBgWidth} height={vars.keyBgHeight} rx={vars.rX} ry={vars.rY}/>
      <g className="key__labels" textAnchor="middle">
        <text className="key__to" x="30" y="80">Alt Gr</text>
      </g>
    </g>
  );
}


// ================================================================================================
// KEY COMPONENTS

function KeyTo (props) {
  if (props.to !== undefined) {
    return (
      <text className="key__to" x="30" y="80">{props.to}</text>
    );
  } else {
    return null;
  }
}

function KeyShift (props) {
  if (props.shift !== undefined) {
    return (
      <text className="key__shift" x="30" y="40" dangerouslySetInnerHTML={{__html: props.shift}}/>
    );
  } else {
    return null;
  }
}

function KeyCaps (props) {
  if (props.caps !== undefined) {
    return (
      <text className="key__caps" x="50" y="50" dangerouslySetInnerHTML={{__html: props.caps}}/>
    );
  } else {
    return null;
  }
}

function KeyCs (props) {
  if (props.cs !== undefined) {
    return (
      <text className="key__cs" x="80" y="50" dangerouslySetInnerHTML={{__html: props.cs}}/>
    );
  } else {
    return null;
  }
}

function KeyAltGr (props) {
  if (props.altgr !== undefined) {
    return (
      <text className="key__altgr" x="80" y="80" dangerouslySetInnerHTML={{__html: props.altgr}}/>
    );
  } else {
    return null;
  }
}

function KeyCc (props) {
  if (props.cc !== undefined) {
    return (
      <text className="key__cc" x="80" y="50" dangerouslySetInnerHTML={{__html: props.cc}}/>
    );
  } else {
    return null;
  }
}

function KeyTransform (props) {
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
      return <KeyEnter/>
    } else if (keyObj.iso === "D00") {
      return <FunctionKeyTab/>
    } else if (keyObj.iso === "B99") {
      return <FunctionKeyLeftShift keyObj={keyObj}/>
    } else if (keyObj.iso === "A08") {
      return <FunctionKeyAltGr keyObj={keyObj}/>
    } else {
      return (
        <g className={keyClass}>
          <rect className="key__bg"/>
          <g className="key__labels" textAnchor="middle">
            <KeyTo to={keyObj.to}/>
            <KeyShift shift={keyObj.shift}/>
            <KeyCaps caps={keyObj.caps}/>
            <KeyCs cs={keyObj.cs}/>
            <KeyAltGr altgr={keyObj.altgr}/>
            <KeyCc cc={keyObj.cc}/>
            <KeyTransform transform={keyObj.transform}/>
          </g>
        </g>
      );
    }
  }
}

KeyboardKey.propTypes = {
  keyObj: PropTypes.object.isRequired
};
