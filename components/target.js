var yo = require('yo-yo')
const header = require ('./header').header
const footer = require ('./header').footer

const url = require('./requestUrl')

function target (state, dispatch) {
  return yo `
  <div class=homediv>
    ${header(state, dispatch)}
    <p>hello I am other</p>
    ${footer(dispatch)}
  </div>
  `
}

module.exports = target
