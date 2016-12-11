var yo = require('yo-yo')
var accessCamera = require ('./camera')
const header = require ('./header').header
const footer = require ('./header').footer
var request = require('superagent')
var onload = require('on-load')

const url = require('./requestUrl')

function renderEntry(entry, state, dispatch) {
  return yo`
  <div class='entry'>
    ${entryHeader(entry, state, dispatch)}
    <img src=${entry.image_url}></img>
  </div>
  `
}

function renderEntries (state, dispatch) {
  // console.log({state});
  return yo `
    <div class='entries'>
      ${state.entries.map( (entry) => {
        return renderEntry(entry, state, dispatch)
      } )}
    </div>
  `
}

function goToUser(state, dispatch, id) {
  dispatch({type: "TOGGLE_LOADING"})
  console.log({id});
  request
    .get(`${url}entries/${id}`)
    .end((err, res) => {
      if (err) {
        dispatch({type: "TOGGLE_LOADING"})
      }
      else {
        console.log({res});
        var dType = "GET_TARGET_ENTRIES"
        if (id == state.user.user_id) dType = "GET_MY_ENTRIES"
        dispatch({type: dType, payload: res.body})
        dispatch({type: "TOGGLE_LOADING"})
      }
    })
}

function entryHeader(entry, state, dispatch) {
  var timeDateEntry = entry.entry_created_at // In prep for date/time reformatting
  return yo`
    <div class='image-header'>
        <h2 class="user-name" onclick=${() => goToUser(state, dispatch, entry.user_id)}>${entry.username}</h2>
        <h2>Added at: ${timeDateEntry} </h2>
    </div>
  `
}

function home (state, dispatch) {
  console.log("home", state);
  return yo `
  <div class="homediv">
    ${header(state, dispatch, getEntries)}
    ${accessCamera(state)}
    ${state.isLoading ? yo`<p>loading</p>` : renderEntries(state, dispatch)}
    ${getEntries(state, dispatch)}
    <button onclick=${()=>{getEntries(state, dispatch, true)}}>click me man</button>
    ${footer(dispatch)}
  </div>
  `
}

function getEntries (state, dispatch, bool) {
  if (state.entries.length === 0 && !state.isLoading || bool) {
    dispatch({type: "TOGGLE_LOADING"})
    request
      .get(url + 'entries')
      .end( (error, res2) => {
        if (error) console.log(error);
        else {
          console.log("response is", res2)
          dispatch({type: 'RECEIVE_ENTRIES', payload: res2.body})
          dispatch({type: "TOGGLE_LOADING"})
        }
      })
  }
}

module.exports = home
