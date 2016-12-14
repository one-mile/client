const request = require('superagent')
const url = require('../requestUrl')

function getEntries (state, dispatch, bool) {
  if (state.entries.length === 0 && !state.isLoading || bool) {
    dispatch({type: "TOGGLE_LOADING"})
    request
      .get(url + 'entries/' + state.user.user_id)
      .withCredentials()
      .end( (error, res) => {
        if (error) console.log(error);
        else {
          dispatch({type: 'RECEIVE_ENTRIES', payload: res.body})
        }
      })
  }
}
module.exports = getEntries
