const clone = require('clone')

module.exports = (state, action) => {
  var newState = require('clone')(state)

  switch (action.type) {
    case 'INIT':
      return newState

      case 'RECEIVE_USER':
        newState.user = action.payload.user
        return newState

      // case 'GO_TO_HOME':
      //   newState.
      //   return newState
      //
      // case 'GO_TO_LOGIN':
      //   return newState
      //
      // case 'GO_TO_SIGNUP':
      //   return newState
      //

    default:
      return newState
  }
}
