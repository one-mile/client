var redux = require('redux')
var morphdom = require('morphdom')
var reducer = require('./reducer')
var request = require('superagent')

var header = require('./components/header')
var login = require('./components/login')

var app = document.createElement('div')
document.querySelector('main').appendChild(app)

var initialState = {
  title: 'One Shot',
  view: 'login'
 }

// request
//   .get('api_goes_here')
//   .end((error, response) => {
//     if (error) {
//       console.log('Erroe goes here')
//     } else {
//       store.dispatch({type: 'GO_TO_LOGIN'})
//     }
//   })


var store = redux.createStore(reducer, initialState)
store.subscribe(() => {
  var view = render(store.getState(), store.dispatch)
  morphdom(app, view)
})

function render (state, dispatch) {
  return login(state, dispatch)
}

store.dispatch({type: 'INIT'})
