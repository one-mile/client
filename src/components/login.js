const yo = require('yo-yo')
const request = require('superagent')
const url = require('./requestUrl')

function login (state, dispatch) {
  return yo`
    <div class="login">
    ${state.isLoading ? yo`<h3 class="loading"> </h3>`
      : yo`<form class="login">
      <input id='username' type='text' placeholder='username'/>
      <input id='password' type='password' placeholder='password'/>
      ${state.authError ? yo`<h3>${state.authError}</h3>` : ''}
      <button onclick=${onSubmit} class='loginBtn' type='submit'>Log In</button>
      <br>
      <button onclick=${() => dispatch({type: 'GO_TO_SIGNUP'})} class='signupBtn' type='submit'>Sign Up</button>
      </form>`}
    </div>
  `
  function onSubmit (e) {
    e.preventDefault()
    var username = document.getElementById('username').value
    var password = document.getElementById('password').value
    if (!(username && password)) {
      dispatch({type: 'LOGIN_ERROR', payload: 'Please complete both fields'})
    } else {
      dispatch({type: 'TOGGLE_LOADING'})
      request
      .post(url + 'users/login')
      .send({username, password})
      .withCredentials()
      .end((error, response) => {
        if (error) {
          dispatch({type: 'LOGIN_ERROR', payload: 'Invalid login'})
          dispatch({type: 'TOGGLE_LOADING'})
        } else {
          dispatch({type: 'RECEIVE_USER', payload: response.body.user})
          dispatch({type: 'TOGGLE_LOADING'})
        }
      })
    }
  }
}

module.exports = login
