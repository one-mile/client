var yo = require('yo-yo')
const accessCamera = require ('./camera')

function header (state, dispatch, refresh) {
  var headerName
  if (state.view === 'me') {
    headerName = state.user.username
  } else if (state.view === 'target') {
    headerName = state.targetEntries[0].username
  } else headerName = null
  return yo `
    <div class="pageHeader">
      ${refresh != null
        ? yo`<h1 onclick=${() => refresh(state, dispatch, true)}>f<span class='lookFlooki'>look</span>i
        </h1>`
        : ""
      }
      ${state.user ? shotsRemaining(state) : ''}
      ${headerName
        ?
        state.myFollowing.includes(state.targetId)
          ? yo`<h1 class="following" onclick=${() => unFollowUser(state.targetId, state.user.id)}">${headerName}</h1>`
          : yo`<h1 class="notFollowing" onclick=${() => followUser(state.targetId, state.user.id)}">${headerName}</h1>`
        : ""
      }
    </div>
  `
}

function goHome(dispatch) {
  dispatch({type: "GO_TO_HOME"})
}

function goToFollows(dispatch) {
  dispatch({type: "GO_TO_FOLLOWS"})
}

function goToUser(dispatch) {
  dispatch({type: "GO_TO_USER"})
}

function footer (state, dispatch) {
  if (state.user) {
    return yo `
    <div class="pageFooter">
      <i class=${viewIconTurner("home", "ion-ios-home")} id='homeButton' onclick=${() => goHome(dispatch)}></i>
      <i class='ion-ios-circle-outline' id='cameraButton' onclick=${() => accessCamera(state, dispatch)} id="upload_widget_opener"></i>
      <i class=${viewIconTurner("me", "ion-ios-person")} id='profileButton' onclick=${() => goToUser(dispatch)}></i>
      ${state.myFollowing != null ? yo`<i class=${viewIconTurner("follows", 'ion-ios-people')} id='followButton' onclick=${() => goToFollows(dispatch)}></i>` : ""}
    </div>
    `
  }
  function viewIconTurner(view, icon) {
    return state.view == view ? icon : `${icon}-outline`
  }
}



function shotsRemaining(state) {
  return yo `
    <h1 class='shots-remaining'>
      ${shotsView(state.user.shotsRemaining)}
    </h1>
  `
}

function shotsView(shotsRemaining) {
  var shotsView = []
  for (var i = 1; i <= 4; i++) {
     shotsView.push(yo`
       <div class=${i <= shotsRemaining ? 'remaining' : 'taken'}></div>
       `)
  }
  return shotsView
}

// var btnText = document.querySelector('select_file')
// if (btnText) btnText.innerHTML = 'test'

module.exports = {
  header,
  footer
}
