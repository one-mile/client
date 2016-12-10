var yo = require('yo-yo')

function header (state) {
  return yo `
    <div class="pageHeader">
      <h1>${state.title}</h1>
      <hr>
    </div>
  `
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
