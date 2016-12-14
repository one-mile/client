const request = require('superagent')
const url = require('../requestUrl')

function goToUser(state, dispatch, boolean) {
  if (!state.isLoading && state.myEntries.length == 0 || boolean) {
    dispatch({type: "TOGGLE_LOADING"})
    request
      .get(`${url}entries/user/${state.user.user_id}`)
      .withCredentials()
      .end((err, res) => {
        console.log("user entries",{res});
        if (err) {
          dispatch({type: "TOGGLE_LOADING"})
        } else if (res.body.user_entries.length == 0) {
          dispatch({type: "GO_TO_USER"})
        } else {
          dispatch({type: "GET_MY_ENTRIES", payload: {body: res.body}})
        }
      })
  }
}

module.exports = goToUser
