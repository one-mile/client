var yo = require('yo-yo')
const header = require ('./header').header
const footer = require ('./header').footer

function App(state, dispatch, child){
  return yo`
    <div id="app">
      ${header(state, dispatch)}
      ${child(state, dispatch)}
      ${footer(state, dispatch)}
    </div>
  `
}

module.exports = App
