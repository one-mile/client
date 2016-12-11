var yo = require('yo-yo')
const header = require ('./header').header
const footer = require ('./header').footer
const renderEntries = require('./renderEntries')
const url = require('./requestUrl')

function target (state, dispatch) {
  return yo `
  <div class='homediv'>
    <p>hello I am other</p>
    ${renderEntries(state, dispatch, state.targetEntries)}
  </div>
  `
}

module.exports = target
