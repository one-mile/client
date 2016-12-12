const clone = require('clone')
const flukeReducer = require('./components/flukeReduce')

module.exports = (state, action) => {
  var newState = require('clone')(state)
  const {payload, type} = action
  switch (type) {
    case 'TOGGLE_LOADING':
      newState.isLoading = !newState.isLoading
      return newState
    case 'RECEIVE_USER':
      newState.user = payload
      newState.view = 'home'
      return newState
    case 'RECEIVE_ENTRIES':
      newState.entries = payload.entries
      newState.myFlukes = payload.myFlukes
      return newState
    case 'GET_TARGET_ENTRIES':
      newState.targetEntries = payload.user_entries
      newState.view = 'target'
      return newState
    case 'GET_MY_ENTRIES':
      newState.myEntries = payload.user_entries
      newState.view = 'me'
      return newState
    case 'GO_TO_HOME':
      newState.isLoading = false;
      newState.view = 'home'
      return newState
    case 'GO_TO_LOGIN':
      newState.view = 'login'
      return newState
    case 'GO_TO_SIGNUP':
      newState.view = 'signup'
      return newState
    case 'TOGGLE_FLUKE':
      flukeReducer(newState, payload)
      return newState
    case 'AUTH_ERROR':
      newState.authError = payload
      return newState
    case 'SHOW_COMMENTS':
      newState.entryForComments = payload
      newState.entryComments = null
      return newState
    case 'RECIEVE_COMMENTS':
      newState.entryComments = payload.entry_comments
      return newState
    case 'HIDE_COMMENTS':
      newState.entryForComments = null
      newState.entryComments = []
      return newState
    case 'POST_COMMENT':
      var commentObj = {
        comment: payload.comment,
        username: newState.user.username
      }
      incrementCommentCounts (payload.entry_id, newState)
      newState.entryComments.unshift(commentObj)
      return newState
    case 'ADD_NEW_PHOTO':
      var entry = constructEntry(payload, newState.user.username)
      newState.entries.unshift(entry)
      newState.myEntries.unshift(entry)
      return newState
    default:
      return newState
  }
}

function constructEntry({entry_id, image_url}, username) {
  return {
    entry_id,
    image_url,
    commentCount: 0,
    entry_created_at: null,
    flukes: 0,
    username
  }
}

function incrementCommentCounts (entry_id, state) {
  incrementCommentCount(entry_id, state.entries)
  incrementCommentCount(entry_id, state.myEntries)
  incrementCommentCount(entry_id, state.targetEntries)
}

function incrementCommentCount (entry_id, entries) {
  var i = null
  entries.forEach((entry, index) => {
    console.log(entry.entry_id);
    if(entry.entry_id == entry_id) i = index

  })
  if (i != null) {
    entries[i].comment_count++
  }
}
