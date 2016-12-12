const clone = require('clone')
const flukeReducer = require('./components/flukeReduce')

module.exports = (state, action) => {
  var newState = require('clone')(state)
  const {payload, type} = action
  switch (type) {
    case 'INIT':
      return newState
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
      newState.entryForComments = []
      newState.entryComments = null
      return newState
    default:
      return newState
  }
}
