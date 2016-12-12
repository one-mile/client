const request = require('superagent')
const url = require('./requestUrl')
const yo = require('yo-yo')
const moment = require('moment')

function renderComments(entry_id, state, dispatch) {
  var comments = state.entryComments || []
  return yo`
    <form>
      <input id="commentField" type="text" placeholder="post your comment here"/>
      <button id="commentButton" onclick=${postComment} type="submit">Post Comment</button>
      <div class="comments">
        ${comments.map((comment) => renderComment(comment))}
      </div>
    </form>
  `
  function postComment(e) {
    e.preventDefault()
    var comment = document.getElementById('commentField').value
    var obj = {
      entry_id,
      user_id: state.user.user_id,
      comment
    }
    request
      .post(`${url}entries/comments/new`)
      .send(obj)
      .end((err, res) => {
        if (err) console.log(err);
        else dispatch({type: "POST_COMMENT", payload: {comment, entry_id}})
      })
  }
}

function renderComment(comment, dispatch) {
  var formattedDate = moment(comment.comment_created_at).format('HH:mma, MMM Do')
  return yo`
    <div class="comment">
      <h3>${comment.username}</h3>
      <p>${comment.comment}</p>
      <p>${formattedDate}</p>
    </div>
  `
}

function hideComments(dispatch) {
  dispatch({type: "HIDE_COMMENTS"})
}

function showComments(entry, state, dispatch) {
  dispatch({type: "SHOW_COMMENTS", payload: entry.entry_id})
  request
    .get(`${url}entries/comments/${entry.entry_id}`)
    .end((err, res) => {
      dispatch({type: 'RECIEVE_COMMENTS', payload: res.body})
    })
}

module.exports = {
  renderComments,
  hideComments,
  showComments
}
