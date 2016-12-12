var yo = require('yo-yo')
const header = require ('./header').header
const footer = require ('./header').footer
const renderEntries = require('./renderEntries')
const url = require('./requestUrl')
const userPageSyntax = require('./syntax')

function target (state, dispatch) {
  return yo `
  <div class='homediv'>
    <p>${state.targetEntries[0].username} has made ${state.targetEntries.length} ${userPageSyntax(state.targetEntries.length)}.</p>
    ${renderEntries(state, dispatch, state.targetEntries)}
  </div>
  `
}

module.exports = target
