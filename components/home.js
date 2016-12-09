var yo = require('yo-yo')
var header = require ('./header')

function home (state, dispatch) {
  return yo `
  <div>
    ${header(state)}
    <hr>
  </div>
  `
}

module.exports = home
