require("./keyboard-key.scss");

import React, {PropTypes} from "react";

import vars from "../variables";

import KeyEnter from "./KeyEnter";


// ================================================================================================
// FUNCTION KEYS

function KeyBackground (props) {
  // Background "image", the visible key
  let x = props.x || vars.keyPaddingX;
  let y = props.x || vars.keyPaddingY;
  let width = props.width || vars.keyWidth - vars.keyPaddingX * 2;
  let height = props.height || vars.keyHeight - vars.keyPaddingY * 2;
  let rx = vars.rX;
  let ry = vars.rY;

  return (
    <rect className="key__bg" x={x} y={y} width={width} height={height} rx={rx} ry={ry}/>
  );
}

function FunctionKeyBackspace (props) {
  // Backspace
  let keyObj = props.keyObj;
  let backspaceWidth = vars.keyWidth * 2 - vars.keyPaddingX * 2;
  let translate = keyObj.translate || "translate(" + vars.keyWidth * 13 + ", 0)";
  return (
    <g className={"key key__backspace " + keyObj.iso + " " + keyObj.state} transform={translate}>
      <KeyBackground width={backspaceWidth}/>
      <g className="key__labels" textAnchor="middle">
        <text className="key__to" x="30" y="80">⟵</text>
      </g>
    </g>
  );
}

function FunctionKeyCapsLock (props) {
  // CapsLock
  let keyObj = props.keyObj;
  let capsLockWidth = vars.keyWidth + vars.cRowShift - 2 * vars.keyPaddingX;
  let translate = keyObj.translate || "translate(0, " + vars.keyHeight * 2 + ")";

  return (
    <g className={"key key__capslock " + keyObj.iso + " " + keyObj.state} transform={translate}>
      <KeyBackground width={capsLockWidth}/>
      <g className="key__labels" textAnchor="middle">
        <text className="key__to" x="30" y="80">Caps Lock</text>
      </g>
    </g>
  );
}

function FunctionKeyTab (props) {
  // Tab
  let keyObj = props.keyObj;
  let tabWidth = vars.keyWidth + vars.dRowShift - 2 * vars.keyPaddingX;
  let translate = keyObj.translate || "translate(0, " + vars.keyHeight + ")";

  return (
    <g className={"key key__tab " + keyObj.iso + " " + keyObj.state} transform={translate}>
      <KeyBackground width={tabWidth}/>
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
  let translate = keyObj.translate || "translate(0, " + vars.keyHeight * 3 + ")";

  return (
    <g className={"key key__left-shift " + keyObj.iso + " " + keyObj.state} transform={translate}>
      <KeyBackground width={leftShiftWidth}/>
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

function LabelTo (props) {
  if (props.to !== undefined) {
    return (
      <text className="key__to" x="30" y="80">{props.to}</text>
    );
  } else {
    return null;
  }
}

function LabelShift (props) {
  if (props.shift !== undefined) {
    return (
      <text className="key__shift" x="30" y="40" dangerouslySetInnerHTML={{__html: props.shift}}/>
    );
  } else {
    return null;
  }
}

function LabelCaps (props) {
  if (props.caps !== undefined) {
    return (
      <text className="key__caps" x="50" y="50" dangerouslySetInnerHTML={{__html: props.caps}}/>
    );
  } else {
    return null;
  }
}

function LabelCs (props) {
  if (props.cs !== undefined) {
    return (
      <text className="key__cs" x="80" y="50" dangerouslySetInnerHTML={{__html: props.cs}}/>
    );
  } else {
    return null;
  }
}

function LabelAltGr (props) {
  if (props.altgr !== undefined) {
    return (
      <text className="key__altgr" x="80" y="80" dangerouslySetInnerHTML={{__html: props.altgr}}/>
    );
  } else {
    return null;
  }
}

function LabelCc (props) {
  if (props.cc !== undefined) {
    return (
      <text className="key__cc" x="80" y="50" dangerouslySetInnerHTML={{__html: props.cc}}/>
    );
  } else {
    return null;
  }
}

function LabelTransform (props) {
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

    if (keyObj.iso === "E14") {
      return <FunctionKeyBackspace keyObj={keyObj}/>
    } else if (keyObj.iso === "C00") {
      return <FunctionKeyCapsLock keyObj={keyObj}/>
    } else if (keyObj.iso === "D13") {
      return <KeyEnter keyObj={keyObj}/>
    } else if (keyObj.iso === "D00") {
      return <FunctionKeyTab keyObj={keyObj}/>
    } else if (keyObj.iso === "B99") {
      return <FunctionKeyLeftShift keyObj={keyObj}/>
    } else if (keyObj.iso === "A08") {
      return <FunctionKeyAltGr keyObj={keyObj}/>
    } else {
      return (
        <g className={keyClass} transform={keyObj.translate}>
          <KeyBackground/>
          <g className="key__labels" textAnchor="middle">
            <LabelTo to={keyObj.to}/>
            <LabelShift shift={keyObj.shift}/>
            <LabelCaps caps={keyObj.caps}/>
            <LabelCs cs={keyObj.cs}/>
            <LabelAltGr altgr={keyObj.altgr}/>
            <LabelCc cc={keyObj.cc}/>
            <LabelTransform transform={keyObj.transform}/>
          </g>
        </g>
      );
    }
  }
}

KeyboardKey.propTypes = {
  keyObj: PropTypes.object.isRequired
};
