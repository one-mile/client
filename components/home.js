var yo = require('yo-yo')
var header = require ('./header')

function renderEntry(entry, dispatch) {
  return yo`
  <div class='entry'>
    ${entryHeader(entry, dispatch)}
    <img src=${entry.image_url}></img>
  </div>
  `
}

function renderEntries (state, dispatch) {
  console.log({state});
  return yo `
    <div class='entries'>
      ${state.entries.map( (entry) => {
        return renderEntry(entry, dispatch)
      } )}
    </div>
  `
}

function entryHeader(entry, dispatch) {
  return yo`
    <div class='image-header'>
      <h2>username: [tba]</h2>
      <h3>Added at: ${entry.created_at} </h3>
    </div>
  `
}


function home (state, dispatch) {
  return yo `
  <div>
    ${header(state)}
    ${state.isLoading ? yo`<p>loading</p>` : "" }
    ${renderEntries(state, dispatch)}
  </div>
  `
}

module.exports = home
