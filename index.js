var redux = require('redux')
var morphdom = require('morphdom')

var reducer = require('./reducer')
var header = require('./components/header')
var login = require('./components/login')
var home = require('./components/home')
var target = require('./components/target')
var user = require('./components/user')
var signup = require('./components/signup')

var app = document.createElement('div')
document.querySelector('main').appendChild(app)

var initialState = {
  title: 'flooki',
  view: 'login',
  user: {},
  authError: null,
  isLoading: false,
  entries: [],
  myEntries: [],
  targetEntries: []
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
      return signup(state, dispatch)
    case 'home':
      return home(state, dispatch)
    case 'target':
    console.log("target view");
      return target(state, dispatch)
    case 'me':
      return user(state, dispatch)
    default:
      return login(state, dispatch)
  }
}

store.dispatch({type: 'INIT'})
