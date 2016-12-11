const clone = require('clone')

module.exports = (state, action) => {
  var newState = require('clone')(state)

  switch (action.type) {
    case 'INIT':
      return newState
    case 'TOGGLE_LOADING':
      newState.isLoading = !newState.isLoading
      return newState
    case 'RECEIVE_USER':
      newState.user = action.payload
      newState.view = 'home'
      return newState
    case 'RECEIVE_ENTRIES':
      newState.entries = action.payload.entries
      return newState
    case 'GET_TARGET_ENTRIES':
      newState.targetEntries = action.payload.user_entries
      newState.view = 'target'
      return newState
    case 'GET_MY_ENTRIES':
      newState.myEntries = action.payload.user_entries
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
      if (action.payload.action === 'fluke') {
        var flukedEntry = newState.entries.find( (entry) => entry.entry_id === action.payload.entry_id)
        flukedEntry.flukes++
      } else if (action.payload.action === 'defluke') {
        var deFlukedEntry = newState.entries.find( (entry) => entry.entry_id === action.payload.entry_id)
        deFlukedEntry.flukes--
      }
      return newState
    case 'AUTH_ERROR':
      newState.authError = action.payload
      return newState
    default:
      return newState
  }
}
