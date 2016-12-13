const yo = require('yo-yo')
const request = require('superagent')
const onload = require('on-load')
const url = require('./requestUrl')
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
