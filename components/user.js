var yo = require('yo-yo')
const header = require ('./header').header
const footer = require ('./header').footer
const renderEntries = require('./renderEntries')

const url = require('./requestUrl')

function user (state, dispatch) {
  return yo `
  <div class="homediv">
    <p>hello I am me</p>
    ${renderEntries(state, dispatch, state.myEntries)}
  </div>
  `
}

module.exports = user
