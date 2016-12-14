const request = require('superagent')
const url = require('../requestUrl')

function goToTarget(state, dispatch, id, boolean) {
  if (!state.isLoading || boolean) {
    dispatch({type: "TOGGLE_LOADING"})
    request
      .get(`${url}entries/user/${id}`)
      .withCredentials()
      .end((err, res) => {
        if (err) {
          dispatch({type: "TOGGLE_LOADING"})
        }
        else {
          var dType = "GET_TARGET_ENTRIES"
          if (id == state.user.user_id) dType = "GET_MY_ENTRIES"
          // console.log(dType, id);
          dispatch({type: dType, payload: {body: res.body, id: id || state.user.user_id}})
        }
      })
  }
}

module.exports = goToTarget
