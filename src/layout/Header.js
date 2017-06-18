import React from "react";
import {Link} from "react-router";
import NavLink from './NavLink'

export default class Header extends React.Component {

  render() {
    return (
      <header class="header">
        <div class="container header__container">
          <nav class="header__nav site-nav">
            <div class="site-nav__branding">
              <a class="site-nav__link branding__link" href="/">Typing</a>
            </div>
            <ul role="nav" class="site-nav__list">
              <NavLink to="/" >Home</NavLink>
              <NavLink to="/program" >Program</NavLink>
              <NavLink to="/styleguide" >Styleguide</NavLink>
            </ul>
          </nav>

        </div>
      </header>
    )
  }
}
