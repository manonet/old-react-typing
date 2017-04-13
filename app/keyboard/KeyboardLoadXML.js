
import KeyboardProcessXML from "./KeyboardProcessXML";

export default function KeyboardLoadXML (props, callback) {

  fetch(props.keyboardUrl)
  .then(response => response.text())
  .then(function(response) {
    var myObj = KeyboardProcessXML(response);
    callback(myObj);
  }.bind(this), function(error) {
    // TODO
    alert(error.message);
  });
}
