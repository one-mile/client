var yo = require('yo-yo')
const accessCamera = require ('./camera')

function header (state, dispatch) {
  return yo `
    <div class="pageHeader">
      <h1>${state.title}</h1>
      ${state.user ? shotsRemaining(state) : ''}
    </div>
  `
}

// ${refresh ? yo`<h1 onclick=${() => refresh(state, dispatch, true)}>Refresh</h1>` : ""}

function goHome(dispatch) {
  dispatch({type: "GO_TO_HOME"})
}

function footer (state, dispatch) {
  if (state.user) {
    return yo `
    <div class="pageFooter">
      <i class='ion-ios-home-outline' id='homeButton' onclick=${() => goHome(dispatch)}></i>
      <i class='ion-ios-circle-outline' id='cameraButton' onclick=${() => accessCamera(state, dispatch)} id="upload_widget_opener"></i>
      <i class='ion-ios-person-outline' id='profileButton'></i>
    </div>
    `
  }
}

// function refreshBar (state, dispatch) {
//   return yo`
//
//   `
// }

function shotsRemaining(state) {
  // var shotsRemaining = 2
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

module.exports = {
  header,
  footer
}
