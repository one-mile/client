var yo = require('yo-yo')
const renderEntries = require('./renderEntries')
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
