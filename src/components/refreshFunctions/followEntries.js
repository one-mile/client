const request = require('superagent')
const url = require('../requestUrl')

function getFollows (state, dispatch, bool) {
  if (state.followEntries != null || bool) {
    if ((state.followEntries.length === 0 && !state.isLoading && state.myFollowing.length == 0) || bool) {
      dispatch({type: "TOGGLE_LOADING"})
      request
        .get(url + 'entries/follows/' + state.user.user_id)
        .withCredentials()
        .end( (error, res) => {
          if (error) console.log(error);
          if (res.body.followed_entries.length == 0) {
            dispatch({type: 'GO_TO_FOLLOWS', payload: null})
          } else {
            dispatch({type: 'RECIEVE_FOLLOW_ENTRIES', payload: res.body})
          }
        })
    }
  } else if (!state.isLoading){
    dispatch({type: "GO_TO_FOLLOWS"})
  }
}

module.exports = getFollows
