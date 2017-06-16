import styles from "./keyboardKey.css";

import React, {PropTypes} from "react";

import vars from "../variables";

function mapObject(object, callback) {
  return Object.keys(object).map(function (key) {
    return callback(key, object[key]);
  });
}

// ================================================================================================
// FUNCTION KEYS

function KeyBackground (props) {
  // Background "image", the visible key
  let x = props.x + vars.keyPaddingX || vars.keyPaddingX;
  let y = props.y + vars.keyPaddingY || vars.keyPaddingY;
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
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
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
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
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
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
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
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
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
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
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
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
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
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
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
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
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
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
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
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
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
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
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
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
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
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
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

  leftC = cRowShift - vars.keyWidth;
  let enterPath2 = "M" + (leftD + keyPaddingX) + " " + (rY + keyPaddingY) + "\
            A " + rX + " " + rY + ", 0, 0, 1, " + (leftD + rX + keyPaddingX) + " " + keyPaddingY + "\
            L " + (right - rX - keyPaddingX) + " " + keyPaddingY + "\
            A " + rX + " " + rY + ", 0, 0, 1, " + (right - keyPaddingX) + " " + (rY + keyPaddingY) + "\
            L " + (right - keyPaddingX) + " " + (bottom - rY - keyPaddingY) + "\
            A " + rX + " " + rY + ", 0, 0, 1, " + (right - rX - keyPaddingX) + " " + (bottom - keyPaddingY) + "\
            L " + (leftC + rX + keyPaddingX) + " " + (bottom - keyPaddingY) + "\
            A " + rX + " " + rY + ", 0, 0, 1, " + (leftC + keyPaddingX) + " " + (bottom - rY - keyPaddingY) + "\
            L " + (leftC + keyPaddingX) + " " + (keyHeight + rY + keyPaddingY) + "\
            A " + rX + " " + rY + ", 0, 0, 1, " + (leftC + rX + keyPaddingX) + " " + (keyHeight + keyPaddingY) + "\
            L " + (leftD - rX + keyPaddingX) + " " + (keyHeight + keyPaddingY) + "\
            A " + rX + " " + rY + ", 0, 0, 0, " + (leftD + keyPaddingX) + " " + (keyHeight - rY + keyPaddingY) + "\
            L " + (leftD + keyPaddingX) + " " + (rY + keyPaddingY) + " Z"

  if (keyObj.variant === 1) {
    /* shape:
       xx
       -x
    */
    return (
      <g className={"key key__enter " + keyObj.iso + " " + keyObj.state} transform={translate}>
        <path className="key__bg" d={enterPath}/>
        <g className="key__labels">
          <text className="key__to" x="160" y="140">{keyObj.labels.to}</text>
        </g>
      </g>
    );
  } else if (keyObj.variant === 2) {
    /* shape:
       --
       xx
    */
    return (
      <g className={"key key__enter " + keyObj.iso + " " + keyObj.state} transform={"translate(" + (vars.cRowShift + vars.keyWidth * 12) + ", " + vars.keyHeight * 2 + ")"}>
        <KeyBackground width={(vars.keyWidth * 3 - vars.cRowShift) - vars.keyPaddingX * 2}/>
        <g className="key__labels">
          <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
        </g>
      </g>
    );
  } else if (keyObj.variant === 3) {
    /* shape:
       xx
       --
    */
    return (
      <g className={"key key__enter " + keyObj.iso + " " + keyObj.state} transform={"translate(" + (vars.dRowShift + vars.keyWidth * 12) + ", " + vars.keyHeight + ")"}>
        <KeyBackground width={(vars.keyWidth * 3 - vars.dRowShift) - vars.keyPaddingX * 2}/>
        <g className="key__labels">
          <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
        </g>
      </g>
    );
  } else if (keyObj.variant === 4) {
    /* shape:
       -x
       xx
    */
    return (
      <g className={"key key__enter " + keyObj.iso + " " + keyObj.state} transform={translate}>
        <path className="key__bg" d={enterPath2}/>
        <g className="key__labels">
          <text className="key__to" x="120" y="140">{keyObj.labels.to}</text>
        </g>
      </g>
    );
  } else {
    // TODO
    return null;
  }
}

// ================================================================================================
// KEY COMPONENTS

function Text (props) {
  let x = props.x + vars.keyLabelX;
  let y = props.y + vars.keyLabelY + 10;
  let name = props.name;
  let visibility = "hidden";
  let keyEvent = props.keyEvent;
  let checkKeyEvents = props.checkKeyEvents;


  switch (name) {
    case "":
      x = props.x;
      y = props.y;
      break;

    default:
      break;
  }

  if (name === "to") {
    visibility = "visible";
  }

  if (checkKeyEvents) {
    //console.log("inLabel checkKeyEvents");


    if (keyEvent.shiftKey && keyEvent.CapsLock) {
      //console.log("shift");
      if (name === "caps+shift") {
        visibility = "visible";
      } else if (name === "to") {
        visibility = "hidden";
      }
    } else if (keyEvent.CapsLock && !(keyEvent.altKey && keyEvent.ctrlKey)) {
      //console.log("caps");
      if (name === "caps") {
        visibility = "visible";
      } else if (name === "to") {
        visibility = "hidden";
      }
    } else if (keyEvent.shiftKey) {
      //console.log("shift");
      if (name === "shift") {
        visibility = "visible";
      } else if (name === "to") {
        visibility = "hidden";
      }
    } else if (keyEvent.altKey && keyEvent.ctrlKey) {
      //console.log("AltGr");
      if (name === "altR+caps? ctrl+alt+caps?") {
        visibility = "visible";
      } else if (name === "to") {
        visibility = "hidden";
      }
    }

  }

  return (
    <text
      className={"key__label " + props.name + " " + visibility}
      dangerouslySetInnerHTML={{__html: props.value}}
      x={x}
      y={y}
    />
  )
}

function Labels (props) {

  let keyObj = props.keyObj;
  let x = props.keyObj.x || 0;
  let y = props.keyObj.y || 0;
  let labels = props.keyObj.labels;
  let iso = props.keyObj.iso;
  let displayedLevel = props.displayedLevel;

  // chech if labels is empty
  if (Object.keys(labels).length === 0) {
    return null;
  } else {
    // display all characters within own text on keytop
    return (
      <g className="key__labels">
      {
        mapObject(labels, function (key, value) {
          return <Text
            key={key}
            name={key}
            value={value}
            keyEvent={props.keyEvent}
            checkKeyEvents={props.checkKeyEvents}
            x={x}
            y={y}
          />
        })
      }
      </g>
    );
  }

}

function LabelTransform (props) {
  if (props.transform !== undefined) {
    return (
      <text className="key__transform" dangerouslySetInnerHTML={{__html: props.transform}} display="none"/>
    );
  } else {
    return null;
  }
}


export default class KeyboardKey extends React.Component {
  render () {
    let keyObj = this.props.keyObj;
    let keyEvent = this.props.keyEvent;
    let checkKeyEvents = (Object.keys(keyEvent).length !== 0) ? true : false;

    let x = keyObj.x || 0;
    let y = keyObj.y || 0;

    let keyClass = "key key--" + keyObj.iso.substring(0, 1) + " " + keyObj.iso + " " + keyObj.state;

    // When letters on a case pair are associated with a key, only the capital character need to be shown on the keytop for the primary group, while the lowercase character only is shown for the secondary group.
    if (keyObj.labels.to.toString().toUpperCase() === keyObj.labels.shift) {
      keyClass += " alpha";
    }

    if (keyObj.iso === "E14") {
      return <FunctionKeyBackspace keyObj={keyObj}/>
    } else if (keyObj.iso === "C00") {
      return <FunctionKeyCapsLock keyObj={keyObj}/>
    } else if (keyObj.name === "enter") {
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
      // Space (A03 to A07)
      return (
        <g className={keyClass}>
          <KeyBackground width={vars.keyWidth * 5 - vars.keyPaddingX * 2} x={x} y={y}/>
        </g>
      );
    } else {
      return (
        <g className={keyClass} textAnchor="middle">
          <KeyBackground x={x} y={y}/>
          <Labels keyObj={keyObj} checkKeyEvents={checkKeyEvents} keyEvent={keyEvent} displayedLevel={this.props.displayedLevel}/>
          <LabelTransform transform={keyObj.transform}/>
        </g>
      );
    }
  }
}

KeyboardKey.propTypes = {
  keyObj: PropTypes.object.isRequired
};
