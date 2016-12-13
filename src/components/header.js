var yo = require('yo-yo')
const accessCamera = require ('./camera')

function header (state, dispatch) {
  var headerName
  if (state.view === 'me') {
    headerName = state.user.username
  } else if (state.view === 'target') {
    headerName = state.targetEntries[0].username
  }
  return yo `
    <div class="pageHeader">
      <h1>f<span class='lookFlooki'>look</span>i</h1>
      <hr>
      ${state.user ? shotsRemaining(state) : ''}
      <h4 class='pageUserName'>${headerName}</h4>
      x
    </div>
  `
}

function goHome(dispatch) {
  dispatch({type: "GO_TO_HOME"})
}

function footer (state, dispatch) {
  if (state.user) {
    return yo `
    <div class="pageFooter">
      <i class='ion-ios-home-outline' id='homeButton' onclick=${() => goHome(dispatch)}></i>
      <i class='ion-ios-circle-outline' onclick=${() => accessCamera(state, dispatch)} id="upload_widget_opener"></i>
      <i class='ion-ios-person-outline' id='profileButton'></i>
    </div>
    `
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
