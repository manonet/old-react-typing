import React from 'react';

export default function KeyboardKeyShift (props) {
  if (props.shift !== undefined) {
    return (
      <text className="key__shift" x="30" y="40" dangerouslySetInnerHTML={{__html: props.shift}}/>
    );
  } else {
    return null;
  }
}

