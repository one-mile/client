var yo = require('yo-yo')
const accessCamera = require('./camera')
const request = require('superagent')
const url = require('./requestUrl')

function header (state, dispatch, refresh) {
  var headerName
  if (state.view === 'me') {
    headerName = state.user.username
  } else if (state.view === 'target') {
    headerName = state.targetEntries[0].username
  } else headerName = null
  return yo`
    <div class="pageHeader">
      ${refresh != null
        ? yo`<h1 id="refresh" onclick=${() => refresh(state, dispatch, true)}>f<span class='lookFlooki'>look</span>i
        </h1>`
        : yo`<h2 id="noRefresh">f<span class='lookFlooki'>look</span>i</h2>`
      }
      ${state.user ? shotsRemaining(state) : ''}
      ${headerName ? displayUser(state, dispatch) : ''}
    </div>
  `
  function displayUser () {
    if (state.myFollowing.includes(state.targetId)) {
      return yo`<h1 class="following" onclick=${() => followHandler(state.targetId, state.user.user_id)}">u ${headerName}</h1>`
    } else {
      return yo`<h1 class="notFollowing" onclick=${() => followHandler(state.targetId, state.user.user_id)}">f ${headerName}</h1>`
    }
  }
  function followHandler (followed_user_id, following_user_id) {
    request
      .post(`${url}entries/follows/new`)
      .send({followed_user_id, following_user_id})
      .withCredentials()
      .end((err, res) => {
        if (err) console.log({err})
        if (res.text === 'success') {
          dispatch({type: 'TOGGLE_FOLLOW', payload: followed_user_id})
        } else console.log('failed')
      })
  }
}

function goHome (dispatch) {
  dispatch({type: 'GO_TO_HOME'})
}

function goToFollows (dispatch) {
  dispatch({type: 'GO_TO_FOLLOWS'})
}

function goToUser (dispatch) {
  dispatch({type: 'GO_TO_USER'})
}

function footer (state, dispatch) {
  if (state.user) {
    return yo `
    <div class="pageFooter">
      <i class=${viewIconTurner('home', 'ion-ios-home')} id='homeButton' onclick=${() => goHome(dispatch)}></i>
      <i class=${viewIconTurner('me', 'ion-ios-person')} id='profileButton' onclick=${() => goToUser(dispatch)}></i>
      <i class=${viewIconTurner('follows', 'ion-ios-people')} id='followButton' onclick=${() => goToFollows(dispatch)}></i>
      <i class='ion-ios-circle-outline' onclick=${() => accessCamera(state, dispatch)} id="upload_widget_opener"></i>
    </div>
    `
  }
  function viewIconTurner (view, icon) {
    return state.view == view ? icon : `${icon}-outline`
  }
}

function shotsRemaining (state) {
  return yo `
    <h1 class='shots-remaining'>
      ${shotsView(state.user.shotsRemaining)}
    </h1>
  `
}

function shotsView (shotsRemaining) {
  var shotsView = []
  for (var i = 1; i <= 4; i++) {
    shotsView.push(yo`
       <div class=${i <= shotsRemaining ? 'remaining' : 'taken'}></div>
       `)
  }
  return shotsView
}

module.exports = {
  header,
  footer
}
