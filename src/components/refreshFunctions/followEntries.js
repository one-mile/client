const request = require('superagent')
const url = require('../requestUrl')

function getFollows (state, dispatch, bool) {
  if (state.followEntries != null ) {
    if (state.followEntries.length === 0 && !state.isLoading && state.myFollowing.length == 0|| bool) {
      dispatch({type: "TOGGLE_LOADING"})
      request
        .get(url + 'entries/follows/' + state.user.user_id)
        .end( (error, res) => {
          if (error) console.log(error);
          else if (res.body.followed_entries.length == 0) {
            // console.log("I am about to dispatch null");
            dispatch({type: 'RECIEVE_FOLLOW_ENTRIES', payload: null})
          } else {
            dispatch({type: 'RECIEVE_FOLLOW_ENTRIES', payload: res.body})
          }
        })
    }
  } else if (!state.isLoading){
    dispatch({type: "TOGGLE_LOADING"})
    request
      .get(url + 'entries/' + state.user.user_id)
      .end( (error, res) => {

        if (error) console.log(error);
        else {
          dispatch({type: 'RECEIVE_ENTRIES', payload: res.body})
        }
      })
  }
}

module.exports = getFollows
