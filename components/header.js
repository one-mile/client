var yo = require('yo-yo')

function header (state, dispatch, refresh) {
  return yo `
    <div class="pageHeader">
      ${refresh ? yo`<h1 onclick=${() => refresh(state, dispatch, true)}>Refresh</h1>` : "no refresh"}
      <h1>${state.title}</h1>
    </div>
  `
}

function goHome(dispatch) {
  dispatch({type: "GO_TO_HOME"})
}

function footer (state, dispatch) {
  return yo `
    <div class="pageFooter">
      <h1 class="homeButton" onclick=${() => goHome(dispatch)}>Go Home</h1>
    </div>
  `
}

module.exports = {
  header,
  footer
}
