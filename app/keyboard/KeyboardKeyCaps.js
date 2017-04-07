import React from 'react';

export default function KeyboardKeyCaps (props) {
  if (props.caps !== undefined) {
    return (
      <text className="key__caps" x="50" y="50" dangerouslySetInnerHTML={{__html: props.caps}}/>
    );
  } else {
    return null;
  }
}

