var yo = require('yo-yo')
var header = require ('./header')

function home (state, dispatch) {
  return yo `
  <div>
    ${header(state)}
    <p>home</p>
  </div>
  `
}

module.exports = home
