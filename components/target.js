var yo = require('yo-yo')
const header = require ('./header').header
const footer = require ('./header').footer
const renderEntries = require('./renderEntries')
const url = require('./requestUrl')

function target (state, dispatch) {
  console.log({state})
  return yo `
  <div class='homediv'>
    <p>User page for user with ID of ${state.targetEntries[0].user_id}, who has made ${state.targetEntries.length} posts.</p>
    ${renderEntries(state, dispatch, state.targetEntries)}
  </div>
  `
}

module.exports = target
