require("./keyboard-key.scss");

import React, {PropTypes} from 'react';

export default class KeyboardKey extends React.Component {
  render () {
    let rowClass = "key--" + this.props.iso.substring(0, 1);

    return (
      <g className={"key " + rowClass + " " + this.props.iso + " " + this.props.state}>
        <rect className="key__bg"/>
        <g className="key__labels" textAnchor="middle">
          <text className="key__shift" x="30" y="40" dangerouslySetInnerHTML={{__html: this.props.shift}}/>
          <text className="key__caps" x="50" y="50" dangerouslySetInnerHTML={{__html: this.props.caps}}/>
          <text className="key__cs" x="50" y="50" dangerouslySetInnerHTML={{__html: this.props.cs}}/>
          <text className="key__altgr" x="80" y="80" dangerouslySetInnerHTML={{__html: this.props.altgr}}/>
          <text className="key__cc" x="50" y="50" dangerouslySetInnerHTML={{__html: this.props.cc}}/>
          <text className="key__to" x="30" y="80">{this.props.to}</text>
        </g>
      </g>
    );
  }
}

KeyboardKey.propTypes = {
  iso: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  shift: PropTypes.string.isRequired,
  caps: PropTypes.string.isRequired,
  cs: PropTypes.string.isRequired,
  altgr: PropTypes.string.isRequired,
  cc: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};
