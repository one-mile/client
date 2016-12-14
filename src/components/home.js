const yo = require('yo-yo')
const renderEntries = require('./renderEntries')
const homeEntries = require('./refreshFunctions/homeEntries')

function home (state, dispatch) {
  return yo `
  <div class="homediv">
    ${state.isLoading ? yo`<p>loading</p>` : renderEntries(state, dispatch, state.entries)}
    ${homeEntries(state, dispatch)}
  </div>
  `
}

module.exports = home
