var yo = require('yo-yo')
const renderEntries = require('./renderEntries')
const userPageSyntax = require('./syntax')
const goToMyUser = require('./refreshFunctions/userEntries')

function user (state, dispatch) {
  return yo `
  <div class="homediv">
    <p>${state.user.username} has made ${state.myEntries.length} ${userPageSyntax(state.myEntries.length)}.</p>
    ${renderEntries(state, dispatch, state.myEntries)}
    ${goToMyUser(state, dispatch)}
  </div>
  `
}

module.exports = user
