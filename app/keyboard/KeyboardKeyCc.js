import React from 'react';

export default function KeyboardKeyCc (props) {
  if (props.cc !== undefined) {
    return (
      <text className="key__cc" x="50" y="50" dangerouslySetInnerHTML={{__html: props.cc}}/>
    );
  } else {
    return null;
  }
}

