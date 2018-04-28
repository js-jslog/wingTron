// a react component
// which consists of a load of logic wrapped in a <canvas> element
// the size of the canvas element is determined during initialisation by either receiving the variables in the call or just filling up it's parent
var options;
var setCanvas = function (c) {
  options.canvas = c;
}
var addScoreboard = function (s) {
  scoreboard
