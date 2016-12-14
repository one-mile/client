var yo = require('yo-yo')
const accessCamera = require ('./camera')
const request = require('superagent')
const url = require('./requestUrl')

function header (state, dispatch, refresh) {
  console.log("my following", state);
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
      ${headerName ? displayUser(state, dispatch) : ""}
    </div>
  `
  function displayUser() {
    console.log("target id", state.targetId);
    if (state.myFollowing.includes(state.targetId)) {
      return yo`<h1 class="following" onclick=${() => followHandler(state.targetId, state.user.user_id, state, dispatch, false)}">u ${headerName}</h1>`
    } else {
      console.log("NO");
      return yo`<h1 class="notFollowing" onclick=${() => followHandler(state.targetId, state.user.user_id, state, dispatch, true)}">f ${headerName}</h1>`
    }
  }
}



function followHandler(followed_user_id, following_user_id, state, dispatch, bool) {
  var endpoint = 'new'
  console.log("follow handler following", state);
  if (bool === false) {
    // console.log("I should delete");
    endpoint = 'delete'
  }
  request
    .post(`${url}entries/follows/${endpoint}`)
    .send({followed_user_id, following_user_id})
    .end((err, res) => {
      if(err) console.log({err});
      // console.log("user followed by user", followed_user_id, following_user_id);
      var dtype = "UNFOLLOW_USER"
      // console.log({res});
      if(res.text === "success") {
        if(endpoint === 'new') {
          dtype = "FOLLOW_USER"
        }
        dispatch({type: dtype, payload: followed_user_id})
      }
    })

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
      <i class='ion-ios-circle-outline' onclick=${() => accessCamera(state, dispatch)} id="upload_widget_opener"></i>
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
