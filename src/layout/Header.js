import React from "react";
import NavLink from './NavLink'

export default class Header extends React.Component {

  render() {
    return (
      <header class="header">
        <div class="container header__container">
          <nav class="header__nav nav">
            <div class="nav__branding">
              <a class="nav__link branding__link" href="/">Typing</a>
            </div>
            <ul role="nav" class="nav__list nav__list--site">
              <NavLink to="/home" className="site" >Home</NavLink>
              <NavLink to="/program" className="site" >Program</NavLink>
              <NavLink to="/styleguide" className="site" >Styleguide</NavLink>
            </ul>
          </nav>

        </div>
      </header>
    )
  }
}
