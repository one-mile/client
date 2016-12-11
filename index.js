var redux = require('redux')
var morphdom = require('morphdom')

var reducer = require('./reducer')
var header = require('./components/header')
var login = require('./components/login')
var home = require('./components/home')
var target = require('./components/target')
var user = require('./components/user')
var signup = require('./components/signup')
var App = require('./components/app')

var request = require('superagent')

var app = document.createElement('div')
document.querySelector('main').appendChild(app)

document.getElementById("upload_widget_opener").addEventListener("click", function () {
      cloudinary.openUploadWidget({ cloud_name: 'toothandpail', upload_preset: 'fasiveib' },
        function (error, result) {
          request
            .post('http://one-shot-api.herokuapp.com/api/v1/entries/new')
            .type('application/json')
            .send({ "user_id": state.user.user_id, "image_url": result[0].secure_url })
          console.log(error, state.user.user_id, result[0].secure_url)
        })
    }, false)

var initialState = {
  title: 'flooki',
  view: 'login',
  user: null,
  authError: null,
  isLoading: false,
  entries: [],
  myEntries: [],
  targetEntries: [],
  myFlukes: []
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
      return App(state, dispatch, login)
    case 'signup':
      return App(state, dispatch, signup)
    case 'home':
      return App(state, dispatch, home)
    case 'target':
      return App(state, dispatch, target)
    case 'me':
      return App(state, dispatch, user)
    default:
      return App(state, dispatch, login)
  }

}

store.dispatch({type: 'INIT'})
