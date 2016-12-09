const yo = require('yo-yo')
const request = require('superagent')
const header = require ('./header')

var heroku = 'http://one-shot-api.herokuapp.com/api/v1/'
var local = 'http://localhost:3000/api/v1/'

module.exports = login
function loginRequest(form) {
  console.log(form)
}

function login (state, dispatch) {
  function onSubmit (e) {
    e.preventDefault()
    var username = document.getElementById('username').value
    var password = document.getElementById('password').value
    dispatch({type: "TOGGLE_LOADING"})
    request
      .post(heroku + 'users/login')
      .send({username, password})
      .end((error, response) => {
        console.log("first response", response);
        if (error) {
          console.log(error, 'Error goes here')
        } else {
          console.log("got it!!!!!", response.body.user)
          dispatch({type: "TOGGLE_LOADING"})
          dispatch({type: 'RECEIVE_USER', payload: response.body.user})
          request
            .get(heroku + 'entries')
            .end( (error, response) => {
              console.log("response is", response)
            })
        }
      })
    console.log(username);
  }

  return yo`
    <div>
    ${header(state)}
      <h3>Login</h3>
      ${state.isLoading ? yo`<h3 class="loading">Loading...</h3>`
      : yo`<form class="login">
      <input id='username' type='text' placeholder='username'/>
      <input id='password' type='password' placeholder='password'/>
      <button onclick=${onSubmit} class='loginBtn' type='submit'>Sign In</button>
      <button class='signupBtn' type='submit'>Sign Up</button>
      </form>`}

    </div>
  `
}
