const yo = require('yo-yo')
const request = require('superagent')
const onload = require('on-load')
const url = require('./requestUrl')
const renderEntries = require('./renderEntries')
const followEntries = require('./refreshFunctions/followEntries')

function follows (state, dispatch) {
  return yo `
  <div class="homediv">
      "follows"
      ${state.isLoading ? yo`<p>loading</p>` : renderEntries(state, dispatch, state.followEntries)}
    ${followEntries(state, dispatch)}
    <button onclick=${()=>{followEntries(state, dispatch, true)}}>get follows</button>
  </div>
  `
}

module.exports = follows
