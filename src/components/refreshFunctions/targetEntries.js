const request = require('superagent')
const url = require('../requestUrl')

function goToTarget(state, dispatch, id, boolean) {
  if (!state.isLoading && state.targetId == null || boolean) {
    var id = id || state.targetId
    dispatch({type: "TOGGLE_LOADING"})
    request
      .get(`${url}entries/user/${id}`)
      .end((err, res) => {
        if (err) {
          dispatch({type: "TOGGLE_LOADING"})
        }
        else {
          var dType = "GET_TARGET_ENTRIES"
          if (id == state.user.user_id) dType = "GET_MY_ENTRIES"
          dispatch({type: dType, payload: {body: res.body, id}})
        }
      })
  }
}

module.exports = goToTarget
