import React from 'react';

export default function KeyboardKeyAltGr (props) {
  if (props.altgr !== undefined) {
    return (
      <text className="key__altgr" x="80" y="80" dangerouslySetInnerHTML={{__html: props.altgr}}/>
    );
  } else {
    return null;
  }
}

