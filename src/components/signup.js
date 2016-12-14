const yo = require('yo-yo')
const request = require('superagent')
const url = require('./requestUrl')

module.exports = signup

function signup (state, dispatch) {
  return yo`
    <div class='signup'>
      <form class='signup'>
        <input id='username' type='text' placeholder='choose username'/>
        <input id='password' type='password' placeholder='choose password'/>
        <input id='rpt-password' type='password' placeholder='confirm password'/>
        <input id='email' type='text' placeholder='enter email'/>
        ${state.authError ? yo`<h3>${state.authError}</h3>` : ''}
        <button onclick=${handleSignup} class='createBtn' type='submit'>Create Account</button>
        <br>
        <button class='backBtn' onclick=${() => dispatch({type: 'GO_TO_LOGIN'})}>Back to Login</button>
      </form>
    </div>
  `

  function handleSignup (e) {
    e.preventDefault()
    var username = document.getElementById('username').value
    var password = document.getElementById('password').value
    var rptPassword = document.getElementById('rpt-password').value
    var email = document.getElementById('email').value
    if (!(username && password && rptPassword && email)) {
      dispatch({type: 'AUTH_ERROR', payload: 'Please complete all fields'})
    } else if (password !== rptPassword) {
      dispatch({type: 'AUTH_ERROR', payload: 'Passwords do not match'})
    } else if (username.length > 12) {
      dispatch({type: 'AUTH_ERROR', payload: 'Username must be 12 characters or shorter'})
    } else if (password.length < 6) {
      dispatch({type: 'AUTH_ERROR', payload: 'Password must be at least 6 characters long'})
    } else if (!email.includes('.') && !email.includes('@')) {
      dispatch({type: 'AUTH_ERROR', payload: 'Please enter a valid email address'})
    } else {
      dispatch({type: 'TOGGLE_LOADING'})
      request
          .post(url + 'users/signup')
          .send({username, password, email})
          .end((err, response) => {
            if (response.body.user_id === 0) {
              dispatch({type: 'AUTH_ERROR', payload: 'Username already taken'})
              return
            }
            request
              .post(url + 'users/login')
              .send({username, password})
              .withCredentials()
              .end((error, response) => {
                if (error) {
                  dispatch({type: 'AUTH_ERROR', payload: 'An error has occurred. Please try again.'})
                } else {
                  dispatch({type: 'RECEIVE_USER', payload: response.body.user})
                  dispatch({type: 'TOGGLE_LOADING'})
                }
              })
          })
    }
  }
}
