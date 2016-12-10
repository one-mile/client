var yo = require('yo-yo')
const header = require ('./header').header
const footer = require ('./header').footer
var request = require('superagent')
var onload = require('on-load')

var heroku = 'http://one-shot-api.herokuapp.com/api/v1/'
var local = 'http://localhost:3000/api/v1/'
var url = local

function renderEntry(entry, dispatch) {
  return yo`
  <div class='entry'>
    ${entryHeader(entry, dispatch)}
    <img src=${entry.image_url}></img>
  </div>
  `
}

function renderEntries (state, dispatch) {
  // console.log({state});
  return yo `
    <div class='entries'>
      ${state.entries.map( (entry) => {
        return renderEntry(entry, dispatch)
      } )}
    </div>
  `
}

function goToUser(dispatch, id) {
  dispatch({type: "TOGGLE_LOADING"})
  console.log({id});
  request
    .get(`${url}entries/${id}`)
    .end((err, res) => {
      if (err) {
        dispatch({type: "TOGGLE_LOADING"})
      }
      else {
        console.log(res.body);
        dispatch({type: "GET_TARGET_ENTRIES", payload: res.body.user_entries})
      }
    })
}

function entryHeader(entry, dispatch) {
  var timeDateEntry = entry.entry_created_at // In prep for date/time reformatting
  return yo`
    <div class='image-header'>
        <h2 class="user-name" onclick=${() => goToUser(dispatch, entry.user_id)}>${entry.username}</h2>
        <h2>Added at: ${timeDateEntry} </h2>
    </div>
  `
}


function home (state, dispatch) {
  console.log("home", state);
  return yo `
  <div class="homediv">
    ${header(state)}
    ${state.isLoading ? yo`<p>loading</p>` : renderEntries(state, dispatch) }
    ${getEntries(state, dispatch)}
    <button onclick=${()=>{getEntries(state, dispatch, true)}}>click me man</button>
    ${footer(dispatch)}
  </div>

  `
}

function getEntries (state, dispatch, bool) {
  console.log(state.entries.length);
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
