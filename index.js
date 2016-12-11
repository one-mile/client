var redux = require('redux')
var morphdom = require('morphdom')

var reducer = require('./reducer')
var header = require('./components/header')
var login = require('./components/login')
var home = require('./components/home')
var target = require('./components/target')
var user = require('./components/user')
var signup = require('./components/signup')
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
