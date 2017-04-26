require("./keyboard-key.scss");

import React, {PropTypes} from "react";

import vars from "../variables";

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
  let capsLockWidth = vars.keyWidth + vars.cRowShift - vars.keyPaddingX * 2;
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
  let tabWidth = vars.keyWidth + vars.dRowShift - vars.keyPaddingX * 2;
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
  let leftShiftWidth = vars.bRowShift - vars.keyPaddingX * 2;
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

function FunctionKeyRightShift (props) {
  // Right Shift
  let keyObj = props.keyObj;
  let rightShiftWidth = (vars.keyWidth * 3 - vars.bRowShift) - vars.keyPaddingX * 2;
  let translate = keyObj.translate || "translate(" + (vars.bRowShift + vars.keyWidth * 12) + ", " + vars.keyHeight * 3 + ")";

  return (
    <g className={"key key__right-shift " + keyObj.iso + " " + keyObj.state} transform={translate}>
      <KeyBackground width={rightShiftWidth}/>
      <g className="key__labels" textAnchor="middle">
        <text className="key__to" x="30" y="80">⇧</text>
      </g>
    </g>
  );
}

function FunctionKeyLeftCtrl (props) {
  // Left Ctrl
  let keyObj = props.keyObj;
  let leftCtrlWidth = vars.bRowShift - vars.keyPaddingX * 2;
  let translate = keyObj.translate || "translate(0, " + vars.keyHeight * 4 + ")";

  return (
    <g className={"key key__left-ctrl " + keyObj.iso + " " + keyObj.state} transform={translate}>
      <KeyBackground width={leftCtrlWidth}/>
      <g className="key__labels" textAnchor="middle">
        <text className="key__to" x="30" y="80">Ctrl</text>
      </g>
    </g>
  );
}

function FunctionKeyFn (props) {
  // fn
  let keyObj = props.keyObj;
  let translate = keyObj.translate || "translate(" + vars.aRowShift + ", " + vars.keyHeight * 4 + ")";

  return (
    <g className={"key key__fn " + keyObj.iso + " " + keyObj.state} transform={translate}>
      <KeyBackground/>
      <g className="key__labels" textAnchor="middle">
        <text className="key__to" x="30" y="80">Fn</text>
      </g>
    </g>
  );
}

function FunctionKeyLeftCommand (props) {
  // left Command
  let keyObj = props.keyObj;
  let translate = keyObj.translate || "translate(" + (vars.aRowShift + vars.keyWidth) + ", " + vars.keyHeight * 4 + ")";

  return (
    <g className={"key key__left-command " + keyObj.iso + " " + keyObj.state} transform={translate}>
      <KeyBackground/>
      <g className="key__labels" textAnchor="middle">
        <text className="key__to" x="30" y="80">⌘</text>
      </g>
    </g>
  );
}

function FunctionKeyAlt (props) {
  // Alt
  let keyObj = props.keyObj;
  let translate = keyObj.translate || "translate(" + (vars.aRowShift + vars.keyWidth * 2) + ", " + vars.keyHeight * 4 + ")";

  return (
    <g className={"key key__alt " + keyObj.iso + " " + keyObj.state} transform={translate}>
      <KeyBackground/>
      <g className="key__labels" textAnchor="middle">
        <text className="key__to" x="30" y="80">Alt</text>
      </g>
    </g>
  );
}

function FunctionKeyAltGr (props) {
  // AltGr
  let keyObj = props.keyObj;
  let translate = keyObj.translate || "translate(" + (vars.aRowShift + vars.keyWidth * 8) + ", " + vars.keyHeight * 4 + ")";

  return (
    <g className={"key key__altgr " + keyObj.iso + " " + keyObj.state} transform={translate}>
      <KeyBackground/>
      <g className="key__labels" textAnchor="middle">
        <text className="key__to" x="30" y="80">Alt Gr</text>
      </g>
    </g>
  );
}

function FunctionKeyRightCommand (props) {
  // right Command
  let keyObj = props.keyObj;
  let translate = keyObj.translate || "translate(" + (vars.aRowShift + vars.keyWidth * 9) + ", " + vars.keyHeight * 4 + ")";

  return (
    <g className={"key key__right-command " + keyObj.iso + " " + keyObj.state} transform={translate}>
      <KeyBackground/>
      <g className="key__labels" textAnchor="middle">
        <text className="key__to" x="30" y="80">⌘</text>
      </g>
    </g>
  );
}

function FunctionKeyMenu (props) {
  // Menu
  let keyObj = props.keyObj;
  let translate = keyObj.translate || "translate(" + (vars.aRowShift + vars.keyWidth * 11) + ", " + vars.keyHeight * 4 + ")";

  return (
    <g className={"key key__menu " + keyObj.iso + " " + keyObj.state} transform={translate}>
      <KeyBackground/>
      <g className="key__labels" textAnchor="middle">
        <text className="key__to" x="30" y="80">Menu</text>
      </g>
    </g>
  );
}

function FunctionKeyRightCtrl (props) {
  // Right Ctrl
  let keyObj = props.keyObj;
  let rightCtrlWidth = (vars.keyWidth * 3 - vars.bRowShift) - vars.keyPaddingX * 2;
  let translate = keyObj.translate || "translate(" + (vars.bRowShift + vars.keyWidth * 12) + ", " + vars.keyHeight * 4 + ")";

  return (
    <g className={"key key__right-shift " + keyObj.iso + " " + keyObj.state} transform={translate}>
      <KeyBackground width={rightCtrlWidth}/>
      <g className="key__labels" textAnchor="middle">
        <text className="key__to" x="30" y="80">Ctrl</text>
      </g>
    </g>
  );
}


function KeyEnter (props) {
  // Enter
  let keyObj = props.keyObj;
  let keyWidth = vars.keyWidth;
  let keyHeight = vars.keyHeight;
  let keyboardWidth = vars.keyboardWidth;
  let keyboardHeight = vars.keyboardHeight;
  let keyPaddingX = vars.keyPaddingX;
  let keyPaddingY = vars.keyPaddingY;
  let dRowShift = vars.dRowShift;
  let cRowShift = vars.cRowShift;
  let bRowShift = vars.bRowShift;
  let aRowShift = vars.aRowShift;
  let rX = vars.rX;
  let rY = vars.rY;

  // for Enter
  let leftD = dRowShift;
  let leftC = cRowShift;
  let right = keyWidth * 2;
  let bottom = keyHeight * 2;
  let translate = keyObj.translate || "translate(" + vars.keyWidth * 13 + ", " + vars.keyHeight + ")";

  let enterPath = "M" + (leftD + keyPaddingX) + " " + (rY + keyPaddingY) + "\
            A " + rX + " " + rY + ", 0, 0, 1, " + (leftD + rX + keyPaddingX) + " " + keyPaddingY + "\
            L " + (right - rX - keyPaddingX) + " " + keyPaddingY + "\
            A " + rX + " " + rY + ", 0, 0, 1, " + (right - keyPaddingX) + " " + (rY + keyPaddingY) + "\
            L " + (right - keyPaddingX) + " " + (bottom - rY - keyPaddingY) + "\
            A " + rX + " " + rY + ", 0, 0, 1, " + (right - rX - keyPaddingX) + " " + (bottom - keyPaddingY) + "\
            L " + (leftC + rX + keyPaddingX) + " " + (bottom - keyPaddingY) + "\
            A " + rX + " " + rY + ", 0, 0, 1, " + (leftC + keyPaddingX) + " " + (bottom - rY - keyPaddingY) + "\
            L " + (leftC + keyPaddingX) + " " + (keyHeight + rY - keyPaddingY) + "\
            A " + rX + " " + rY + ", 0, 0, 0, " + (leftC - rX + keyPaddingX) + " " + (keyHeight - keyPaddingY) + "\
            L " + (leftD + rX + keyPaddingX) + " " + (keyHeight - keyPaddingY) + "\
            A " + rX + " " + rY + ", 0, 0, 1, " + (leftD + keyPaddingX) + " " + (keyHeight - rY - keyPaddingY) + "\
            L " + (leftD + keyPaddingX) + " " + (rY + keyPaddingY) + " Z"

  return (
    <g className="key key__enter" transform={translate}>
      <path className="key__bg" d={enterPath} fill="#0f0"/>
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
    }  else if (keyObj.iso === "B13") {
      return <FunctionKeyRightShift keyObj={keyObj}/>
    } else if (keyObj.iso === "A99") {
      return <FunctionKeyLeftCtrl keyObj={keyObj}/>
    } else if (keyObj.iso === "A00") {
      return <FunctionKeyFn keyObj={keyObj}/>
    } else if (keyObj.iso === "A01") {
      return <FunctionKeyLeftCommand keyObj={keyObj}/>
    } else if (keyObj.iso === "A02") {
      return <FunctionKeyAlt keyObj={keyObj}/>
    } else if (keyObj.iso === "A08") {
      return <FunctionKeyAltGr keyObj={keyObj}/>
    } else if (keyObj.iso === "A09") {
      return <FunctionKeyRightCommand keyObj={keyObj}/>
    } else if (keyObj.iso === "A11") {
      return <FunctionKeyMenu keyObj={keyObj}/>
    } else if (keyObj.iso === "A12") {
      return <FunctionKeyRightCtrl keyObj={keyObj}/>
    } else if (keyObj.iso === "A03") {
      // Space
      return (
        <g className={keyClass} transform={keyObj.translate}>
          <KeyBackground width={vars.keyWidth * 5 - vars.keyPaddingX * 2}/>
        </g>
      );
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
