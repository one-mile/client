var yo = require('yo-yo')
const header = require ('./header').header
const footer = require ('./header').footer

function user (state, dispatch) {
  return yo `
  <div class="homediv">
    ${header(state)}
    <p>hello I am me</p>
    ${footer(dispatch)}
  </div>
  `
}

module.exports = user
