const clone = require('clone')
const moment = require('moment')
const flukeReducer = require('./components/flukeReduce')

module.exports = (state, action) => {
  var newState = clone(state)
  const {payload, type} = action
  switch (type) {
    case 'TOGGLE_LOADING':
      newState.isLoading = !newState.isLoading
      return newState
    case 'RECEIVE_USER':
      newState.isLoading = false
      newState.user = payload
      newState.view = 'follows'
      return newState
    case 'RECEIVE_ENTRIES':
      newState.isLoading = false
      newState.entries = payload.entries
      newState.myFlukes = payload.myFlukes
      return newState
    case 'RECIEVE_FOLLOW_ENTRIES':
      if (payload != null) {
        newState.followEntries = payload.followed_entries
        newState.myFollowing = payload.following_list
      } else {
        newState.followEntries = null
        newState.myFollowing = []
      }
      newState.isLoading = false
      return newState
    case 'GET_TARGET_ENTRIES':
      newState.targetEntries = payload.body.user_entries
      newState.targetId = payload.id
      newState.view = 'target'
      newState.isLoading = false
      return newState
    case 'GET_MY_ENTRIES':
      newState.myEntries = payload.body.user_entries
      newState.view = 'me'
      newState.targetId = newState.user.user_id
      newState.isLoading = false
      return newState
    case 'GO_TO_HOME':
      newState.isLoading = false
      newState.view = 'home'
      return newState
    case 'GO_TO_LOGIN':
      newState.view = 'login'
      newState.authError = null
      return newState
    case 'GO_TO_SIGNUP':
      newState.view = 'signup'
      newState.authError = null
      return newState
    case 'GO_TO_FOLLOWS':
      if (newState.myFollowing == null || newState.myFollowing.length == 0) {
        newState.view = 'home'
      } else newState.view = 'follows'
      return newState
    case 'GO_TO_USER':
      if (newState.myEntries == null || newState.myEntries.length == 0) {
        newState.view = 'home'
      } else newState.view = 'me'
      return newState
    case 'TOGGLE_FLUKE':
      flukeReducer(newState, payload)
      return newState
    case 'AUTH_ERROR':
      newState.authError = payload
      return newState
    case 'LOGIN_ERROR':
      newState.authError = payload
      return newState
    case 'SHOW_COMMENTS':
      newState.entryForComments = payload
      newState.entryComments = null
      return newState
    case 'RECIEVE_COMMENTS':
      newState.isLoading = false
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
      incrementCommentCounts(payload.entry_id, newState)
      newState.entryComments.unshift(commentObj)
      return newState
    case 'ADD_NEW_PHOTO':
      var entry = constructEntry(payload, newState.user.username)
      newState.entries.unshift(entry)
      newState.myEntries.unshift(entry)
      return newState
    case 'TOGGLE_FOLLOW':
      if (newState.myFollowing.includes(payload)) {
        while (newState.myFollowing.includes(payload)) {
          var i = newState.myFollowing.indexOf(payload)
          newState.myFollowing.splice(i, 1)
        }
      } else {
        if (!newState.myFollowing.includes(payload)) {
          newState.myFollowing.push(payload)
        }
      }
      return newState
    default:
      return newState
  }
}

function constructEntry ({entry_id, image_url}, username) {
  var justNow = moment()
  return {
    entry_id,
    image_url,
    commentCount: 0,
    entry_created_at: justNow._d,
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
    if (entry.entry_id == entry_id) i = index
  })
  if (i != null) {
    entries[i].comment_count++
  }
}
