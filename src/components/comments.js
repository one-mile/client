const request = require('superagent')
const url = require('./requestUrl')
const yo = require('yo-yo')
const formatDate = require('./formatDate')

function renderComments (entry_id, state, dispatch) {
  var comments = state.entryComments || []
  return yo`
    <form>
      <input id="commentField" type="text" placeholder="Write your comment here"/>
      <button id="commentButton" onclick=${postComment} type="submit">Post</button>
      <div class="comments">
        ${comments.map((comment) => renderComment(comment))}
      </div>
    </form>
  `
  function postComment (e) {
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
      .withCredentials()
      .end((err, res) => {
        if (err) console.log(err)
        else dispatch({type: 'POST_COMMENT', payload: {comment, entry_id}})
      })
  }
}

function renderComment (comment, dispatch) {
  var formattedDate = formatDate(comment.comment_created_at)
  return yo`
    <div class="comment">
      <h3>${comment.username}</h3>
      <p>${comment.comment}</p>
      <p>${formattedDate}</p>
    </div>
  `
}

function hideComments (dispatch) {
  dispatch({type: 'HIDE_COMMENTS'})
}

function showComments (entry, state, dispatch) {
  dispatch({type: 'SHOW_COMMENTS', payload: entry.entry_id})
  request
    .get(`${url}entries/comments/${entry.entry_id}`)
    .withCredentials()
    .end((err, res) => {
      dispatch({type: 'RECIEVE_COMMENTS', payload: res.body})
    })
}

module.exports = {
  renderComments,
  hideComments,
  showComments
}
