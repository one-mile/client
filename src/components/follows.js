const yo = require('yo-yo')
const renderEntries = require('./renderEntries')
const followEntries = require('./refreshFunctions/followEntries')

function follows (state, dispatch) {
  return yo `
  <div class="homediv">
    ${state.isLoading ? yo`<p>loading</p>` : renderEntries(state, dispatch, state.followEntries)}
    ${followEntries(state, dispatch)}
  </div>
  `
}

module.exports = follows
