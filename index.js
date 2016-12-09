var redux = require('redux')
var morphdom = require('morphdom')

var reducer = require('./reducer')
var header = require('./components/header')
var login = require('./components/login')

var app = document.createElement('div')
document.querySelector('main').appendChild(app)

var initialState = {
  title: 'One Shot',
  view: 'login'
 }



var store = redux.createStore(reducer, initialState)
store.subscribe(() => {
  var view = render(store.getState(), store.dispatch)
  morphdom(app, view)
})

function render (state, dispatch) {
  return login(state, dispatch)
}

store.dispatch({type: 'INIT'})
