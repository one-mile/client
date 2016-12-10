var yo = require('yo-yo')
var header = require ('./header')
var accessCamera = require ('./camera')

function home (state, dispatch) {
  return yo `
  <div>
    ${header(state)}
    <p>home</p>
    ${accessCamera(state)}
  </div>
  `
}

module.exports = home
