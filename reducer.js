const clone = require('clone')
const flukeReducer = require('./components/flukeReduce')

module.exports = (state, action) => {
  var newState = require('clone')(state)

  switch (action.type) {
    case 'TOGGLE_LOADING':
      newState.isLoading = !newState.isLoading
      return newState
    case 'RECEIVE_USER':
      newState.user = action.payload
      newState.view = 'home'
      return newState
    case 'RECEIVE_ENTRIES':
      newState.entries = action.payload.entries
      newState.myFlukes = action.payload.myFlukes
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
      flukeReducer(newState, action.payload)
      return newState
    case 'AUTH_ERROR':
      newState.authError = action.payload
      return newState
    case 'ADD_NEW_PHOTO':
      // newState.entries.push() // in prog
      console.log("newState", newState)
      return newState
    default:
      return newState
  }
}

// newState.entries = action.payload.entries
// newState.myFlukes = action.payload.myFlukes
// return newState
