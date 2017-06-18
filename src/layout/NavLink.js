import styles from "./navLink.css";

import React from "react"
import { Link } from "react-router"

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  render() {
    let className = "nav__item";
    let classPostfix = this.props.className;

    if (classPostfix) {
      className += " nav__item--" + classPostfix;
    }

    let linkClassName = "nav__link";

    if (classPostfix) {
      linkClassName += " nav__link--" + classPostfix;
    }

    return (
      <li className={className}>
        <Link {...this.props} className={linkClassName}  activeClassName="is-active">
          {this.props.children}
        </Link>
      </li>
    )
  }
})
