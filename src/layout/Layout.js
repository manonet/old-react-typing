import styles from "./layout.css";

import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default class Layout extends React.Component {
  render() {
    return (
      <div class="layout">
        <Header/>
        {this.props.children}
        <Footer />
      </div>
    )
  }
}
