const yo = require('yo-yo')
const request = require('superagent')
const onload = require('on-load')

const accessCamera = require ('./camera')
const header = require ('./header').header
const footer = require ('./header').footer
const url = require('./requestUrl')
const renderEntries = require('./renderEntries')

function home (state, dispatch) {
  return yo `
  <div class="homediv">
    ${state.isLoading ? yo`<p>loading</p>` : renderEntries(state, dispatch, state.entries)}
    ${getEntries(state, dispatch)}
    <button onclick=${()=>{getEntries(state, dispatch, true)}}>click me man</button>
  </div>
  `
}

function getEntries (state, dispatch, bool) {
  if (state.entries.length === 0 && !state.isLoading || bool) {
    dispatch({type: "TOGGLE_LOADING"})
    request
      .get(url + 'entries/' + state.user.user_id)
      .end( (error, res) => {

        if (error) console.log(error);
        else {
          dispatch({type: 'RECEIVE_ENTRIES', payload: res.body})
          dispatch({type: "TOGGLE_LOADING"})
        }
      })
  }
}

module.exports = home
