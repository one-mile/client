const request = require('superagent')
const url = require('../requestUrl')

function goToUser(state, dispatch, boolean) {
  console.log("loading?", state.isLoading);
  if (!state.isLoading && state.myEntries.length == 0 || boolean) {
    dispatch({type: "TOGGLE_LOADING"})
    request
      .get(`${url}entries/user/${state.user.user_id}`)
      .end((err, res) => {
        if (err) {
          dispatch({type: "TOGGLE_LOADING"})
        }
        else {
          console.log("user id", state.user);
          console.log("go to my user", {res});
          dispatch({type: "GET_MY_ENTRIES", payload: {body: res.body}})
        }
      })
  }
}

module.exports = goToUser
