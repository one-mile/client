const clone = require('clone')
const moment = require('moment')
const flukeReducer = require('./components/flukeReduce')

module.exports = (state, action) => {
  var newState = require('clone')(state)
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
      // newState.targetId = null
      newState.isLoading = false
      newState.entries = payload.entries
      newState.myFlukes = payload.myFlukes
      return newState
    case 'RECIEVE_FOLLOW_ENTRIES':
      // newState.targetId = null
      if (payload != null) {
        // console.log("RECIEVE FOLLOW ENTRIES", {payload});
        newState.followEntries = payload.followed_entries
        newState.myFollowing = payload.following_list
      } else {
        // console.log("I AM WIPING WITHIN THE REDUCER");
        newState.followEntries = null
        newState.myFollowing = []
      }
      newState.isLoading = false;
      return newState
    case 'GET_TARGET_ENTRIES':
      newState.targetEntries = payload.body.user_entries
      newState.targetId = payload.id
      newState.view = 'target'
      newState.isLoading = false;
      return newState
    case 'GET_MY_ENTRIES':
      newState.myEntries = payload.body.user_entries
      newState.view = 'me'
      newState.targetId = newState.user.user_id
      newState.isLoading = false;
      return newState
    case 'GO_TO_HOME':
      newState.isLoading = false;
      newState.view = 'home'
      // newState.targetId = null
      return newState
    case 'GO_TO_LOGIN':
      newState.view = 'login'
      return newState
    case 'GO_TO_SIGNUP':
      newState.view = 'signup'
      return newState
    case 'GO_TO_FOLLOWS':
      // newState.targetId = null
      newState.view = 'follows'
      return newState
    case 'GO_TO_USER':
      newState.view = 'me'
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
      incrementCommentCounts (payload.entry_id, newState)
      newState.entryComments.unshift(commentObj)
      return newState
    case 'ADD_NEW_PHOTO':
      var entry = constructEntry(payload, newState.user.username)
      newState.entries.unshift(entry)
      newState.myEntries.unshift(entry)
      return newState
    case "FOLLOW_USER":
      // console.log("reducer follow following before",newState.myFollowing);
      if (!newState.myFollowing.includes(payload)) {
        newState.myFollowing.push(payload)
      }
      // console.log("reducer follow following after",newState.myFollowing);
      return newState
    case "UNFOLLOW_USER":
      var i = newState.myFollowing.indexOf(payload)
      newState.myFollowing.splice(i, 1)
      // console.log(" reducer unfollow following", newState.myFollowing);
      return newState
    default:
      return newState
  }
}

function constructEntry({entry_id, image_url}, username) {
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
    if(entry.entry_id == entry_id) i = index
  })
  if (i != null) {
    entries[i].comment_count++
  }
}
