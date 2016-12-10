var redux = require('redux')
var morphdom = require('morphdom')

var reducer = require('./reducer')
var header = require('./components/header')
var login = require('./components/login')
var home = require('./components/home')

var app = document.createElement('div')
document.querySelector('main').appendChild(app)

var initialState = {
  title: 'One Shot',
  view: 'login',
  user: {},
  isLoading: false,
  entries: []
  // username: '',
  // user_id: 0,
  // shotsRemaining: 0
 }

var store = redux.createStore(reducer, initialState)
const {getState, dispatch, subscribe} = store
subscribe(() => {
  var view = render(getState(), dispatch)
  morphdom(app, view)
})

function render (state, dispatch) {
  switch(state.view) {
    case 'login':
      return login(state, dispatch)
    case 'signup':
      return 'memes'
    case 'home':
      return home(state, dispatch)
    default:
      return login(state, dispatch)
  }

}

store.dispatch({type: 'INIT'})
