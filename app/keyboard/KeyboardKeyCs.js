import React from 'react';

export default function KeyboardKeyCs (props) {
  if (props.cs !== undefined) {
    return (
      <text className="key__cs" x="50" y="50" dangerouslySetInnerHTML={{__html: props.cs}}/>
    );
  } else {
    return null;
  }
}

