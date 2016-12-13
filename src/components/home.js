const yo = require('yo-yo')
const request = require('superagent')
const onload = require('on-load')

const header = require ('./header').header
const footer = require ('./header').footer
const url = require('./requestUrl')
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
