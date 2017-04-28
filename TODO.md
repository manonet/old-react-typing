# TODO list

## Keyboard

* [ ] cleanup state
* [ ] move additional keys (function / enter) to proper place in the processing of the keys, DRY
* [ ] determiate operation system and base the selection onto it (Android, Chrome OS, OS X, and Windows are possible values)
* [ ] "hardcode"/integrate _platform.xml as associated array into program
* [ ] create keyboard layout list for selection
* [ ] add a dropdown with list of keyboards layouts to change layout on the fly
* [ ] "separate" layout for each modifier. As default only level 1 characters should be visible, and if modifier key pressed, the characters schould be exchanged to corresponding one, example "a" is visible, and if user press shift, it turns to "A". Is it possible? e.g. altR+shift+caps? ctrl+alt+shift+caps?
* [ ] mark the dead-key keys with unique look, and give them a popup on hover with the possible charactes
* [ ] mark long-press for mac
* [ ] finger association in general
* [ ] check if svg is working properly in target browsers
  * [ ] fill, stroke
  * [ ] transform
  * [ ] text, font-family
  * [ ] animation

## User input

* [ ] disable navigate in user input in any way, e.g. arrow keys or key combinations. The cursor should to stand always after last character.
* [ ] disable copy-paste
* [ ] mark invisible characters like space, newline
* [ ] popup on hover for each character on sample text with more information about letter, like how to write it

