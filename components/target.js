var yo = require('yo-yo')
const header = require ('./header').header
const footer = require ('./header').footer

function target (state, dispatch) {
  return yo `
  <div class=homediv>
    ${header(state)}
    <p>hello I am other</p>
  </div>
  `
}

module.exports = target
