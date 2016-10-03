require("../styles/style.scss");
var React = require('react');
var ReactDOM = require('react-dom');

import Layout from "./components/Layout"

const APP = document.getElementById('app');
ReactDOM.render(<Layout />, APP);
