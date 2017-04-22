import React from "react";
import {Link} from "react-router";
import NavLink from './NavLink'

export default class Header extends React.Component {

  render() {
    return (
      <header class="header">
        <div class="container">
          <div class="header__branding">
            <a href="/">Typing</a>
          </div>
          <nav class="header__nav">
            <ul role="nav" class="list-inline">
              <NavLink to="/" >Home</NavLink>
              <NavLink to="/program" >Program</NavLink>
              <NavLink to="/about" >About</NavLink>
            </ul>
          </nav>

        </div>
      </header>
    )
  }
}
