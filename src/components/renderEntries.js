const yo = require('yo-yo')
const request = require('superagent')
const moment = require('moment')
const url = require('./requestUrl')
const comments = require('./comments')
const goToUser = require('./refreshFunctions/targetEntries')
const formatDate = require('./formatDate')

function renderEntries (state, dispatch, entries) {
  if( entries == null) dispatch({type:"GO_TO_HOME"})
  else {
    return yo `

      <div class='entries'>
      <br>
      <br>
      <br>
      <br>
        ${entries.map( (entry) => {
          return renderEntry(entry, state, dispatch)
        } )}
      </div>
    `
  }
}

function renderEntry(entry, state, dispatch) {
  return yo`
  <div class='entry'>
      ${entryHeader(entry, state, dispatch)}
        <img class=${state.myFlukes.includes(entry.entry_id) ? 'flukedByMe' : 'notFlukedByMe'}
        onclick=${() => fluke(entry.entry_id, state.user.user_id, dispatch)} src=${entry.image_url}></img>
      <h2 id='f'>${state.myFlukes.includes(entry.entry_id) ? 'f' : ''}</h2>
      ${entryFooter(entry, state, dispatch)}
      <hr>
  </div>
  `
}

function entryHeader(entry, state, dispatch) {
  var formattedDate = formatDate(entry.entry_created_at)
  return yo`
    <div class='entry-info'>
        <h4 id='user-name' onclick=${() => goToUser(state, dispatch, entry.user_id, true)}>${entry.username} </h4>
        <h4 id="entry-date">${formattedDate}</h4>
    </div>
  `
}

function entryFooter(entry, state, dispatch) {
  var justNow = moment()
  return yo`
    <div class='image-footer'>
      ${entry.flukes > 0
        ? yo`<h3 class="flukeCount">${entry.flukes}
        ${entry.flukes != 1  ? "flukes" : "fluke"}
        </h3>`
        : ""}
      ${entry.comment_count > 0
        ? yo`<h3 class="commentCount" onclick=${() => comments.showComments(entry, state, dispatch)}>
        ${entry.comment_count}
        ${entry.comment_count != 1
          ? "comments"
          :"comment"}</h3>`
        : yo`
        <div>
        <h3 class="commentCount" onclick=${() => comments.showComments(entry, state, dispatch)}>
          Add Comment
        </h3>
        <br>
        <br>
        <br>
        </div>
        `}
        ${state.entryForComments != entry.entry_id
          ? ""
          :
          yo`
          <div>
          <div class="comments">
          <h3 class="commentsShow" onclick=${() => comments.hideComments(dispatch)}>Hide Comments</h3>
          ${comments.renderComments(entry.entry_id, state, dispatch)}
          </div>
          <br>
          </div>
          `
        }
    </div>
  `
}

function fluke(entry_id, user_id, dispatch) {
  request
  .post(url + 'entries/fluke')
  .send({entry_id, user_id})
  .withCredentials()
  .end((err, res) => {
    if (res.body.success != null) {
      dispatch({type: 'TOGGLE_FLUKE', payload: res.body})
    } else {
      console.log("ERROR")
    }
  })
}



module.exports = renderEntries
