const yo = require('yo-yo')
const request = require('superagent')
const moment = require('moment')
const url = require('./requestUrl')


function renderEntries (state, dispatch, entries) {
  return yo `
    <div class='entries'>
      ${entries.map( (entry) => {
        return renderEntry(entry, state, dispatch)
      } )}
    </div>
  `
}

function renderEntry(entry, state, dispatch) {
  return yo`
  <div class='entry'>
      ${entryHeader(entry, state, dispatch)}
        <img class=${state.myFlukes.includes(entry.entry_id) ? 'flukedByMe' : 'notFlukedByMe'}
        onclick=${() => fluke(entry.entry_id, state.user.user_id, dispatch)} src=${entry.image_url}></img>
  </div>
  `
}

function fluke(entry_id, user_id, dispatch) {
  request
  .post(url + 'entries/fluke')
  .send({entry_id, user_id})
  .end((err, res) => {
    if (res.body.success) {
      dispatch({type: 'TOGGLE_FLUKE', payload: res.body})
    } else {
      console.log("ERROR")
    }
  })
}

function entryHeader(entry, state, dispatch) {
  var formattedDate = moment(entry.entry_created_at).format('HH:mma, MMM Do')
  return yo`
    <div class='image-header'>
        <h3 class='entry-info' onclick=${() => goToUser(state, dispatch, entry.user_id)}>posted by <span class='user-name'>${entry.username}</span> at ${formattedDate}</h3>
        <h3>flukes: ${entry.flukes}</h3>
    </div>
  `
}

function goToUser(state, dispatch, id) {
  dispatch({type: "TOGGLE_LOADING"})
  request
    .get(`${url}entries/user/${id}`)
    .end((err, res) => {
      if (err) {
        dispatch({type: "TOGGLE_LOADING"})
      }
      else {
        var dType = "GET_TARGET_ENTRIES"
        if (id == state.user.user_id) dType = "GET_MY_ENTRIES"
        dispatch({type: dType, payload: res.body})
        dispatch({type: "TOGGLE_LOADING"})
      }
    })
}

module.exports = renderEntries
