var yo = require('yo-yo')

function header (state) {
  return yo `
  <div>
    <h1>${state.title}</h1>
    <hr>
  </div>
  `
}

module.exports = header
