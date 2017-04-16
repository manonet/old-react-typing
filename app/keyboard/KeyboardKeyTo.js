import React from 'react';

export default function KeyboardKeyTo (props) {
  if (props.to !== undefined) {
    return (
      <text className="key__to" x="30" y="80">{props.to}</text>
    );
  } else {
    return null;
  }
}

