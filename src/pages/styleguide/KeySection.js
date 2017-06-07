import React from "react";

import vars from "../../variables";
import KeyboardKey from "../../keyboard/KeyboardKey";

function StyleguideKey (props) {
  // Backspace
  let state = props.state || "def";
  return (
    <svg className="key__svg" version="1.1" viewBox={"0 0 " + vars.keyWidth + " " + vars.keyHeight}>
      <KeyboardKey
        key="D12"
        keyObj={{
          "iso": "D12",
          "labels": {
            "to": "a",
            "shift": "%",
            "altGr": "°"
          },
          "state": state
        }}
        keyEvent={{}}
      />
    </svg>
  );
}

export default class KeySection extends React.Component {
  render() {

      return (
        <section class="section section--key">

          <h2>Key</h2>

          <h3>States</h3>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th>class</th>
                <th></th>
                <th>secondary</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">def</th>
                <td>
                  <StyleguideKey/>
                </td>
                <td>
                  <StyleguideKey state="def secondary"/>
                </td>
              </tr>
              <tr>
                <th scope="row">toWrite</th>
                <td>
                  <StyleguideKey state="toWrite"/>
                </td>
                <td>
                  <StyleguideKey state="toWrite secondary"/>
                </td>
              </tr>
              <tr>
                <th scope="row">correct</th>
                <td>
                  <StyleguideKey state="correct"/>
                </td>
                <td>
                  <StyleguideKey state="correct secondary"/>
                </td>
              </tr>
              <tr>
                <th scope="row">error</th>
                <td>
                  <StyleguideKey state="error"/>
                </td>
                <td>
                  <StyleguideKey state="error secondary"/>
                </td>
              </tr>
              <tr>
                <th scope="row"></th>
                <td>
                  <StyleguideKey state="missed"/>
                </td>
                <td>
                  <StyleguideKey state="missed secondary"/>
                </td>
              </tr>
            </tbody>
          </table>

          <h3>Hotmap</h3>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th>class</th>
                <th>0%</th>
                <th>50%</th>
                <th>100%</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">def</th>
                <td>
                  <StyleguideKey/>
                </td>
                <td>
                  <StyleguideKey/>
                </td>
                <td>
                  <StyleguideKey/>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      )
  }
}
