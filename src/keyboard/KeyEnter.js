import React from "react";
import vars from "../variables";

export default function KeyEnter (props) {
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
    <g className="key key__enter">
      <path className="key__bg" d={enterPath} fill="#0f0"/>
    </g>
  );
}

