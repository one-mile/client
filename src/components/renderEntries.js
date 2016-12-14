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
      ${entryFooter(entry, state, dispatch)}
  </div>
  `
}

function entryHeader(entry, state, dispatch) {
  var formattedDate = formatDate(entry.entry_created_at)
  return yo`
    <div>
        <h3 class='entry-info' onclick=${() => {
          // console.log(entry.entry_id, state.targetId)
          goToUser(state, dispatch, entry.user_id, true)
        }}>
        <span class='user-name'>${entry.username}</span> ${formattedDate}</h3>
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
        <h3 class="commentCount" onclick=${() => comments.showComments(entry, state, dispatch)}>
          Add Comment
        </h3>
        `}
        ${state.entryForComments != entry.entry_id
          ? ""
          :
          yo`
          <div class="comments">
          <h3 class="commentsShow" onclick=${() => comments.hideComments(dispatch)}>Hide Comments</h3>
          ${comments.renderComments(entry.entry_id, state, dispatch)}
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
    if (res.body.success) {
      dispatch({type: 'TOGGLE_FLUKE', payload: res.body})
    } else {
      console.log("ERROR")
    }
  })
}



module.exports = renderEntries
