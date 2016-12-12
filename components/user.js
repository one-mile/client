var yo = require('yo-yo')
const header = require ('./header').header
const footer = require ('./header').footer
const renderEntries = require('./renderEntries')

const url = require('./requestUrl')

function user (state, dispatch) {
  // console.log({state})
  return yo `
  <div class="homediv">
    <p>User page for ${state.user.username}, who has made ${state.myEntries.length} posts.</p>
    ${renderEntries(state, dispatch, state.myEntries)}
  </div>
  `
}

module.exports = user
