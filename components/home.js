var yo = require('yo-yo')
var header = require ('./header')
var takePicture = require ('./takePicture')

function home (state, dispatch) {
  return yo `
  <div>
    ${header(state)}
    <p>home</p>
    ${takePicture(state)}
  </div>
  `
}

module.exports = home
