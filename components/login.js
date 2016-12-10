const yo = require('yo-yo')
const request = require('superagent')
const header = require ('./header').header
const footer = require ('./header').footer

const url = require('./requestUrl')

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
      .post(url + 'users/login')
      .send({username, password})
      .end((error, response) => {
        console.log("first response", response);
        if (error) {
          console.log(error, 'Error goes here')
        } else {
          // console.log("got it!!!!!", response.body.user)
          dispatch({type: 'RECEIVE_USER', payload: response.body.user})
          dispatch({type: "TOGGLE_LOADING"})
        }
      })
  }

  return yo`
    <div>
    ${header(state, dispatch)}
    ${state.isLoading ? yo`<h3 class="loading">Loading...</h3>`
      : yo`<form class="login">
      <h3>Login</h3>
      <input id='username' type='text' placeholder='username'/>
      <input id='password' type='password' placeholder='password'/>
      <button onclick=${onSubmit} class='loginBtn' type='submit'>Sign In</button>
      </form>`}
      <button onclick=${ () => dispatch({type: 'GO_TO_SIGNUP'})} class='signupBtn' type='submit'>Sign Up</button>
    </div>
  `
}
