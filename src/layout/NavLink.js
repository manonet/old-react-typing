import React from "react"
import { Link } from "react-router"

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  render() {
    let isActive = this.context.router.isActive(this.props.to, true),
            className = isActive ? "site-nav__item is-active" : "site-nav__item";

    return (
      <li className={className}>
        <Link {...this.props} className={isActive ? "site-nav__link is-active" : "site-nav__link"}>
          {this.props.children}
        </Link>
      </li>
    )
  }
})
