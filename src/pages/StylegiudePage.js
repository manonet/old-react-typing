import styles from "./styleguidePage.css";

import React from "react";
import NavLink from '../layout/NavLink'

export default class StylegiudePage extends React.Component {
  render() {

      return (
        <main class="main">
          <div class="container styleguide-nav__container">
            <nav class="nav nav--styleguide">
              <ul role="nav" class="nav__list nav__list--styleguide">
                <NavLink to="/styleguide/typo" className="styleguide">Typo</NavLink>
                <NavLink to="/styleguide/charts" className="styleguide">Charts</NavLink>
                <NavLink to="/styleguide/keys" className="styleguide">Keys</NavLink>
              </ul>
            </nav>
          </div>
          <div class="container">
            {this.props.children}
          </div>
        </main>
      )
  }
}
