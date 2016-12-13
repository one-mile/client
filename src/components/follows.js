const yo = require('yo-yo')
const request = require('superagent')
const onload = require('on-load')
const url = require('./requestUrl')
const renderEntries = require('./renderEntries')

function follows (state, dispatch) {
  return yo `
  <div class="homediv">
      "follows"
      ${state.isLoading ? yo`<p>loading</p>` : renderEntries(state, dispatch, state.followEntries)}
    ${getFollows(state, dispatch)}
    <button onclick=${()=>{getFollows(state, dispatch, true)}}>get follows</button>
  </div>
  `
}

function getFollows (state, dispatch, bool) {
  if (state.myFollowing != null) {
    if (state.followEntries.length === 0 && !state.isLoading || bool) {
      dispatch({type: "TOGGLE_LOADING"})
      request
        .get(url + 'entries/follows/' + state.user.user_id)
        .end( (error, res) => {
          console.log("memes", res);
          if (error) console.log(error);
          else if (res.body.followed_entries.length == 0) {
            dispatch({type: 'RECIEVE_FOLLOW_ENTRIES', payload: null})
          } else {
            console.log("follow entries");
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

module.exports = follows
