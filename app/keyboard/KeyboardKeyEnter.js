import React from 'react';

export default function KeyboardKeyEnter (props) {
  let keyWidth = 100;
  let keyHeight = 100;
  let keyboardWidth = 15 * keyWidth;
  let keyboardHeight = 5 * keyHeight;
  let keyPaddingX = 10;
  let keyPaddingY = 10;
  let keyBgWidth = keyWidth - keyPaddingX * 2;
  let keyBgHeight = keyHeight - keyPaddingY * 2;
  let dRowShift = 50;
  let cRowShift = 80;
  let bRowShift = 20;
  let aRowShift = 20;
  let rX = 10;
  let rY = 10;

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

